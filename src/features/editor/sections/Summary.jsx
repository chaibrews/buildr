import FormTextArea from "../../../components/FormTextArea";
import buttonStyles from "../../../components/buttons.module.css";

function Summary({ data, setData }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      summary: { ...prev.summary, [name]: value },
    }));
  }

  return (
    <section>
      <h2>Professional Summary</h2>
      <FormTextArea
        name="description"
        label="SUMMARY"
        value={data.summary.description}
        onChange={handleChange}
      />

      <button
        type="button"
        className={buttonStyles.dangerBtn + " " + buttonStyles.actionBtn}
        onClick={() =>
          setData((prev) => ({
            ...prev,
            summary: { ...prev.summary, description: "" },
          }))
        }
      >
        CLEAR
      </button>
    </section>
  );
}

export default Summary;
