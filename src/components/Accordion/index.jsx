import { Empty } from "antd";
import React, { useState } from "react";

const Accordion = ({ label = "", data = [], defaultActiveIndex = -1 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const toggleAccordion = (e, index) => {
    e.stopPropagation();
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <div className="accordion">
      {/* {!!label && <h3 className="accordion__title label">{label}</h3>} */}
      <h3 className="accordion__title label">{!!label && label}</h3>

      {data?.length === 0 ? (
        <Empty description="Không có nội dung nào" />
      ) : (
        data?.map((question, index) => {
          const { id, title, content } = question;
          return (
            <div
              key={id || index}
              className={`accordion__content ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div
                className="accordion__content-title"
                onClick={(e) => toggleAccordion(e, index)}
              >
                <h4>
                  <strong>{title || ""}</strong>
                </h4>
              </div>
              {/* <div className="accordion__content-text">{content || ""}</div> */}
              <div className="accordion__content-text">
                {Array.isArray(content)
                  ? content.map((item, index) => {
                      return (
                        <div className="item --lock" key={index}>
                          <p>
                            <i>
                              <img
                                src="https://cfdcircle.vn/img/iconlock.svg"
                                alt="CFD Circle"
                              />
                            </i>
                            <span>{item}</span>
                          </p>
                        </div>
                      );
                    })
                  : content}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Accordion;
