import FormField from "../../../components/FormField";

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
        label="NAME *"
        type="text"
        value={data.personal.name}
        onChange={handleChange}
      />
      <FormField
        name="email"
        label="EMAIL *"
        type="email"
        value={data.personal.email}
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
    </section>
  );
}

export default Personal;
