
import { FormControl, InputGroup, Container, Button, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

import './App.css'

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

//Debug
//console.log(clientId, clientSecret);

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]); //albums are going to be an array of information

  // useEffect to make POST request to Spotify API to fetch our access token
  useEffect(() => {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    };
  
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  // async search() func to make GET request for searching an artist or artist's album etc.
  async function search() {
    let artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
  
    // Get Artist, using their ID that holds the name of the artist
    // use await to wait for the async action to finish before continuing the func aka pause until done
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    // Get Artist Albums, 
    // using the returned artistID to connect the artist to their albums
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&market=US&limit=50",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        setAlbums(data.items);
      });
    
    //Debug search
    console.log("Search Input: " + searchInput);
    console.log("Artist ID: " + artistID);
  }

  // front end
  return (
    <>
      {/*1. search bar Container */}
      <Container> 
        <InputGroup>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              } // call search function
            }}
            onChange={(event) => setSearchInput(event.target.value)} // setSearch
            style={{
              width: "300px",
              height: "35px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
          />
      
          <Button onClick={search}>Search</Button> 
        </InputGroup>
      </Container>
            
      {/*2. album card Container */}
      {/* each card will have:
      album's image <Card.Img>, and
      a body <Card.Body> which contains
        - album name <Card.Title>, 
        - its release date <Card.Text>, 
        - its Spotify link <Button> */}
      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          {/* To access our album information array without mutating it when we change it to display our card, use map() */}
          {/* i.e. map the album infos with the components */}
          {albums.map((album) => {
            return (
              <Card
                key={album.id}    //(in React,) key is necessary to uniquely identify elements when rendering lists/array
                style={{
                  backgroundColor: "white",
                  margin: "10px",
                  borderRadius: "5px",
                  marginBottom: "30px",
                }}
              >
                <Card.Img
                  width={200}
                  src={album.images[0].url}
                  style={{
                    borderRadius: "4%",
                  }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      whiteSpace: "wrap",
                      fontWeight: "bold",
                      maxWidth: "200px",
                      fontSize: "18px",
                      marginTop: "10px",
                      color: "black",
                    }}
                  >
                    {album.name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      color: "black",
                    }}
                  >
                    Release Date: <br /> {album.release_date}
                  </Card.Text>
                  <Button
                    href={album.external_urls.spotify}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "15px",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    Album Link
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>

  );
  
}

`
TODOS/Ideas:
- Data Visualization on Spotify Data
- Authentication to your personal Spotify account
- Playlist creator
- CSS Redesign
`

export default App;
