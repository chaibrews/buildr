import "./App.css";
import Editor from "./features/editor/Editor";
import Preview from "./features/preview/Preview";
import useResumeData from "./hooks/useResumeData";

function App() {
  const {
    data,
    setData,
    sectionOrder,
    setSectionOrder,
    clearResume,
    loadSample,
  } = useResumeData();

  return (
    <>
      <div className="header print-hide">buildR.</div>
      <div className="body">
        <div className="app">
          <Editor
            data={data}
            setData={setData}
            onClear={clearResume}
            onLoadSample={loadSample}
            sectionOrder={sectionOrder}
            setSectionOrder={setSectionOrder}
          />
          <Preview data={data} sectionOrder={sectionOrder} />
        </div>
      </div>
    </>
  );
}

export default App;
