import FormField from "../../../components/FormField";
import buttonStyles from "../../../components/buttons.module.css";

function Personal({ data, setData }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }));
  }

  return (
    <section>
      <h2>Personal Information</h2>
      <FormField
        name="name"
        label="NAME"
        type="text"
        value={data.personal.name}
        onChange={handleChange}
      />
      <FormField
        name="email"
        label="EMAIL"
        type="email"
        value={data.personal.email}
        onChange={handleChange}
      />
      <FormField
        name="phone"
        label="PHONE NUMBER"
        type="text"
        value={data.personal.phone}
      />
      <FormField
        name="linkedin"
        label="LINKEDIN"
        type="url"
        value={data.personal.linkedin}
        onChange={handleChange}
      />
      <FormField
        name="linkPortfolio"
        label="PORTFOLIO LINK"
        type="url"
        value={data.personal.linkPortfolio}
        onChange={handleChange}
      />
      <FormField
        name="linkGithub"
        label="GITHUB LINK"
        type="url"
        value={data.personal.linkGithub}
        onChange={handleChange}
      />

      <button
        type="button"
        className={buttonStyles.dangerBtn + " " + buttonStyles.actionBtn}
        onClick={() =>
          setData((prev) => ({
            ...prev,
            personal: {
              ...prev.personal,
              name: "",
              email: "",
              linkPortfolio: "",
              linkGithub: "",
            },
          }))
        }
      >
        CLEAR
      </button>
    </section>
  );
}

export default Personal;
