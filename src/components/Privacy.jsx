import React from "react";

const Privacy = () => {
  return (
    <dialog id="privacy_modal" className="modal">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy?</h2>
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDNiMnZ1amJmMjJlMW12emtmZG1zb3oydjYwaWs3bGp1dDNsN3h3aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7aTskHEUdgCQAXde/giphy.gif"
          alt="Privacy Policy Dance"
          className="w-[600px] h-[400px] max-w-full rounded-md mb-4 mx-auto"
        />
        <p className="text-gray-600 text-center">
          Confused? dont worry..😂 we dont have it
        </p>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Privacy;
