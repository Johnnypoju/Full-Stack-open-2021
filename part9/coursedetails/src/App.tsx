import Header from "./components/Header";
import Content from "./components/Content"
import Total from "./components/Total"
import { courseName, courseParts }from "./data"

const App = () => {
  
  if (! courseName || !courseParts) {
    <h1>...loading</h1>
  }
  
  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;