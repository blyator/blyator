import React from "react";

const Terms = () => {
  return (
    <dialog id="terms_modal" className="modal">
      <div className="modal-box">
        <h1 className="text-2xl text-accent-content font-bold mb-4">
          No terms.. just don't steal the code!
        </h1>
        <img
          src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cHU1a3gxb2UzancyOXAwZnpsczJqNHc5MThmZXMzN24xOW1wN2FrOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xoicctrOv5aGw6mCZi/giphy.gif"
          alt="Privacy Policy Dance"
          className="w-[600px] h-[400px] max-w-full rounded-md mb-4 mx-auto"
        />
        <p className="text-gray-600 text-center">
          But you do agree this site looks cool, right? hire me maybe? 😄
        </p>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Agree🤝</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Terms;
