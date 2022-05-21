import React, { useState } from "react";
import Button from "../../component/loader/Button";
import Input from "../../component/Input";
import { MdClose } from "react-icons/md";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../component/modal/Modal";

export const Profile = () => {
  const {
    authState: { user, loading },
    savePhoto,
  } = useAuth();


  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(false);
  const [imgURL, setImgURL] = useState("" || user?.photo?.secure_url);


  const editProfilePhoto = () => {
    setImgURL(user.photo?.secure_url);
    setShowModal(true);
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = function (ev) {
      setImgURL(ev.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const saveClickHandler = async () => {
    console.log("clicked save", file);
    await savePhoto({file });
    setShowModal(false);
  };


  return (
    <div className="profile-container">
      <section className="flex-col center profile">
        <div className="profile-badge">
          <img
            className="avatar-large"
            src={`${
              user?.photo
                ? user?.photo?.secure_url
                : "https://www.wydawnictwoliteratura.pl/pub/skin/wyd-skin/img/avatar.png"
            }`}
            alt=""
          />
          <button className="btn-red btn-edit" onClick={editProfilePhoto}>
            Edit
          </button>
        </div>

        <div className="signup-container radius-md py-1">
          <Input
            type="email"
            name="email"
            value={user?.email}
            placeholder="Email address"
            disable={true}
          />
          <Input
            name="name"
            value={user?.name}
            placeholder="Full name"
            disable={true}
          />
        </div>
        <Modal show={showModal}>
          <div className="bg-white">
            <div className="flex justify-end">
              <button
                className="transparent p-0"
                onClick={() => setShowModal(false)}
              >
                <MdClose size={20} color="red" />
              </button>
            </div>
            <div className="flex-col items-center">
              <img className="avatar-large" src={imgURL} alt="" />
              <span>
                <input
                  type="file"
                  onChange={fileChangeHandler}
                  className="pointer m-1"
                />
                <Button
                  text="Save"
                  loading={loading}
                  clickHandler={saveClickHandler}
                  btnStyle="btn-red p-0 px-2 m-1 radius-sm"
                />
              </span>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};
