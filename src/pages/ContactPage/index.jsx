import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constant/path";
import useMutation from "../../hooks/useMutation";
import { subscribesService } from "../../services/subscribesServiece";
import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";
import ContactTitle from "./ContactTitle";

const ContactPage = () => {
  const navigate = useNavigate();
  const { execute, data, error, loading } = useMutation((payload) =>
    subscribesService.subscribes(payload)
  );

  console.log("data", data);

  const handleFormSubmit = async (formData) => {
    const payload = {
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
      title: formData.topic || "",
      description: formData.content || "",
    };

    execute?.(payload, {
      onSuccess: (data) => {
        console.log("data", data);
        navigate(PATHS.HOME);
      },
      onFail: (error) => {
        console.log("error", error);
      },
    });
  };

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSidebar />
            <ContactForm handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
