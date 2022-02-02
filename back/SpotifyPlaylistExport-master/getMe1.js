const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQC7lfriAlrmtMINeZrNhGVsqr02YbjbFmuSOd6Eg29bdf_qUdQQEGiJ1WYTt2s70bAcPysWc3uuek0XXh-LOKNteAJXCCX4mXSExLpPZBgYYtgj3hgSzejhvJg3zwyAPV8cmbJAtJUnWqUVudlwn27kPkvfGR3EeQcVyAQDBrC4pIQgBBJ0CyUmyv18jGJs6DsB7JvH6srWX7243SKMFeHCf7zvp3Oc2TEI8WYdiE_G2CMMHGtlKnBHxRuY2N_xpe4AZ29_1RkQRlM2R8Wzb-3VVA"
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body .items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    //console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------")
  return tracks;
}

async function newplaylist(playlistname) {
//add a new playlist to the user
  spotifyApi.createPlaylist(playlistname)
  console.log("playlist : "+playlistname+" is creat");
}

async function getrecentplayed() {
  //Note that the response will be empty in case the user has enabled private session.
  
    spotifyApi.getMyRecentlyPlayedTracks({
      limit : 20
    }).then(function(data) {
        // Output items
        console.log("Your 20 most recently played tracks are:");
        data.body.items.forEach(item => console.log(item.track));
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  }

async function getnamerecentplayed() {
//Note that the response will be empty in case the user has enabled private session.

  spotifyApi.getMyRecentlyPlayedTracks({
    limit : 20
  }).then(function(data) {
      // Output items
      console.log("Your 20 most recently played tracks are:");
      data.body.items.forEach(item => console.log(item.track['name']));
    }, function(err) {
      console.log('Something went wrong!', err);
    });
}


async function searchArtists(research){
// Search artists whose name contains 'Love'
  spotifyApi.searchArtists(research)
  .then(function(data) {
    console.log('Search artists by ' + research, data.body['artists']);
    //data.body.items.forEach(item => console.log(item.track));
  }, function(err) {
    console.error(err);
  });
}

async function searchPlaylists(research){
// Search playlists whose name or description contains 'workout'
  spotifyApi.searchPlaylists(research)
  .then(function(data) {
    console.log('Found playlists are', data.body['playlists']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

async function searchTracks(research){
  spotifyApi.searchTracks(research)
  .then(function(data) {
    console.log('Search by ' + research, data.body['tracks']);
  }, function(err) {
    console.error(err);
  });
}

async function addTracksToPlaylist(playlistID,trackTab){
  // Add tracks to a playlist //track ["spotify:track:trackID"]
  spotifyApi.addTracksToPlaylist(playlistID, trackTab)
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

async function addTracksToPlaylistInPos(playlistID, trackTab,pos){
  // Add tracks to a specific position in a playlist
  spotifyApi.addTracksToPlaylist(playlistID, trackTab,
  {
    position : pos
  })
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

async function reorderTracksInPlaylist(playlistID, posTrack1, posTrack2){
// Reorder the first two tracks in a playlist to the place before the track at the 10th position
  var options = { "range_length" : 1 };
  spotifyApi.reorderTracksInPlaylist(playlistID, posTrack1, posTrack2, options)
  .then(function(data) {
    console.log('Tracks reordered in playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

async function removeTracksFromPlaylistByPosition(playlistId, tabPosTrack, snapshotID){
// Remove tracks from a playlist at a specific position
  spotifyApi.removeTracksFromPlaylistByPosition(playlistId, tabPosTrack,snapshotID)
  .then(function(data) {
    console.log('Tracks removed from playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

async function removeTracksFromPlaylist(playlistId, tracks){
// Remove all occurrence of a track
  var tracks = [{ uri : tracks}];
  var playlistId = playlistId;
  spotifyApi.removeTracksFromPlaylist(playlistId, tracks)
  .then(function(data) {
    //console.log(data);
    console.log('Tracks removed from playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

async function getUserPlaylists(userName){
// Get a user's playlists
  spotifyApi.getUserPlaylists(userName)
  .then(function(data) {
    console.log('Retrieved playlists', data.body);
  },function(err) {
    console.log('Something went wrong!', err);
  });
}

async function getPlaylist(playlistID){
// Get a playlist
  spotifyApi.getPlaylist(playlistID)
  .then(function(data) {
    console.log('Some information about this playlist', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

async function getSnapshotPlaylist(playlistID){
  // Get a playlist
    spotifyApi.getPlaylist(playlistID)
    .then(function(data) {
      console.log('Le snapshot ID :',data.body['snapshot_id']);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }

async function changePlaylistDetails(playlistID, text, desc,boolpublic){
// Change playlist details
  spotifyApi.changePlaylistDetails(playlistID,
  {
    "name": text,  "description": desc, 'public' : boolpublic
  }).then(function(data) {
     console.log('Playlist detail is change!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

async function getAlbumTracks(albumID){
// Get tracks in an album
  spotifyApi.getAlbumTracks(albumID, { limit : 10, offset : 0 })
  .then(function(data) {
    console.log(data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

async function getArtistAlbums(artistID){
// Get albums by a certain artist
  spotifyApi.getArtistAlbums(artistID)
  .then(function(data) {
    console.log('Artist albums', data.body);
  }, function(err) {
    console.error(err);
  });
}

async function getAlbum(albumID){
  // Get album
  spotifyApi.getAlbum(albumID)
  .then(function(data) {
    console.log('Album information', data.body);
  }, function(err) {
    console.error(err);
  });
}

async function getArtist(artistID){
// Get an artist
  spotifyApi.getArtist(artistID)
  .then(function(data) {
    console.log('Artist information', data.body);
  }, function(err) {
    console.error(err);
  });
}

//getMyData();
//newplaylist("testapi");
//getrecentplayed();
//searchArtists("Jul");
//searchPlaylists("Hit");
//searchTracks("Waka");
//addTracksToPlaylist('7bIHXyxXbfnpcYCZb2mfT2',['spotify:track:38QAnJnnYc1tzDtJnoTZHq'])
//addTracksToPlaylistInPos('7bIHXyxXbfnpcYCZb2mfT2',['spotify:track:5Sg3FtU1fSUgj0QTl0P4kX'],0)
//reorderTracksInPlaylist('7bIHXyxXbfnpcYCZb2mfT2',1,3); //avec 0,3 c'est le premier son qui va à la position 3, avec 1 c'est le deuxième...
//removeTracksFromPlaylistByPosition('7bIHXyxXbfnpcYCZb2mfT2',[1],'MTcsZWNhNDY1NDViMzdiMjcwZTYwMGE2OTU4NDVlNWU2MDg0ZDM3ZmM5Mg=='); //la position est la liste commençant à 0
/////////snapshot id est une version de la playlist, la version change quand la modifie, il faut donc renseigner le nouveau snpashot pour les modifs
//removeTracksFromPlaylist('7bIHXyxXbfnpcYCZb2mfT2','spotify:track:38QAnJnnYc1tzDtJnoTZHq');
//getUserPlaylists("ddlejoly");
//getPlaylist('7bIHXyxXbfnpcYCZb2mfT2');
//changePlaylistDetails('7bIHXyxXbfnpcYCZb2mfT2',"testapi","New detail", true);
//getAlbumTracks('4YdMS0CiZ3Il1tCQfi4E2E');
//getArtistAlbums('3IW7ScrzXmPvZhB27hmfgy');
//getAlbum('4YdMS0CiZ3Il1tCQfi4E2E');
//getArtist('3IW7ScrzXmPvZhB27hmfgy');

//////pour recuperrer une informations soit c'est un objet (albums, artistes) donc on met : .objet
//////soit c'est une propriété on met : ['propiete']

getnamerecentplayed(); //modifié pour recup que le nom des musiques et pas l'objet entier
getSnapshotPlaylist('7bIHXyxXbfnpcYCZb2mfT2'); //modifié pour recup le snashoatID

