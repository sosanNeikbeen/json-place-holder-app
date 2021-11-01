import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ImageList from "./components/ImageList";
import ImageSlider from "./components/ImageSlider";
import { ImageProvider } from "./context/ImageContext";
import VideoUpload from "./components/VideoUpload";
import Login from "./components/Login";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <ImageProvider>
          <PrivateRoute path="/" exact component={ImageList} />
          <PrivateRoute path="/images/:index" exact component={ImageSlider} />
          <PrivateRoute path="/video-upload" exact component={VideoUpload} />
          <Route path="/login" exact component={Login} />
        </ImageProvider>
      </Switch>
    </Router>
  );
};

export default App;
