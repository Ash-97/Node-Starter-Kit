const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   let searchQuery = req.query.episode;
//   let searchQuery2 = req.query.episode2;
//   res.send("result is" + searchQuery * searchQuery2);
// });
// app.get("/gameofthrones", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

app.get("/", (req, res) => {
  // res.send("Welcome to the albums API: Try asking for /albums.");
  res.sendFile(__dirname + "/index.html");
});

app.get("/albums", function (req, res) {
  res.send(albumsData);
});

// Search the albums using this route '/albums/search?word=Beyonce'
app.get("/albums/search", (req, res) => {
  const searchWord = req.query.word;
  if (searchWord) {
    const searchAlbums = (searchQuery) => {
      const searchQueryLowered = searchQuery.toLowerCase();
      return albumsData.filter(
        (obj) =>
          obj.artistName.toLowerCase().includes(searchQueryLowered) ||
          obj.collectionName.toLowerCase().includes(searchQueryLowered)
      );
    };
    res.send(searchAlbums(searchWord));
  } else res.status(404).send("No Albums Found With The Query");
});

app.get("/albums/:albumId", (req, res) => {
  const id = req.params.albumId;
  const albumsFiltered = albumsData.filter((album) => {
    return album.albumId === id;
  });
  res.send(albumsFiltered);
});

app.post("/albums", function (req, res) {
  albumsData.push(req.body);
  res.status(201).json(albumsData);
});

app.put("/albums/:id", (req, res) => {
  const albumUpdateId = req.params.id;
  const { artistName, collectionName, primaryGenreName } = req.body;
  const currentAlbum = albumsData.find(
    (album) => album.albumId === albumUpdateId
  );
  currentAlbum.artistName = artistName;
  currentAlbum.collectionName = collectionName;
  currentAlbum.primaryGenreName = primaryGenreName;
  res.status(200).json(albumsData);
});

app.listen(PORT, () => {
  console.log(`This server is running on Port ${PORT}`);
});
