import React from "react";
import ZoneList from "./components/ZoneList";

function App() {
  return (
    <div className="App">
      
      <header className="App-header"><div class="header-txt-container">
        <p>Cette application est réalisé avec ReactJS V16 et utilise les API / packages suivants :</p>
        <ul><li><a href="https://api.gouv.fr/les-api/api-geo">API Géo du gouvernement</a></li>
        <li><a href="https://picsum.photos/">API de génération d'images picsum</a></li>
        <li><a href="https://github.com/axios/axios">Client HTTP - Axios</a></li>
        <li><a href="https://github.com/atlassian/react-beautiful-dnd">Drag and Drop - react-beautiful-dnd</a></li>
        <li><a href="https://www.npmjs.com/package/react-confirm-alert">Popup de confirmation - react-confirm-alert</a></li></ul>
        </div> 
        <h1 className="site-title">Expérimentation sur ReactJS</h1>
        <p>Ajoutez des zones géographiques et leurs spots touristiques correspondants :</p>
        
      </header>
      <ZoneList />
    </div>
  );
}

export default App;
