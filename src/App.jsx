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
    exportData,
    importData,
  } = useResumeData();

  return (
    <>
      <header className={`header print-hide`}>
        <div className="headerBrand">
          <span className="headerLogo">buildR.</span>
          <span className="headerTagline">clean resumes. no fluff.</span>
        </div>
      </header>{" "}
      <div className="body">
        <div className="app">
          <Editor
            data={data}
            setData={setData}
            onClear={clearResume}
            onLoadSample={loadSample}
            onExport={exportData}
            onImport={importData}
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
