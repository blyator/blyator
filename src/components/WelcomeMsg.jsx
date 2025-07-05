// import { useEffect, useContext } from "react";
// import { toast } from "react-hot-toast";
// import { UserContext } from "../context/UserContext";

// const getTimeBasedGreeting = () => {
//   const hour = new Date().getHours();

//   if (hour >= 5 && hour < 12) {
//     return "Good morning";
//   } else if (hour >= 12 && hour < 17) {
//     return "Good afternoon";
//   } else if (hour >= 17 && hour < 22) {
//     return "Good evening";
//   } else {
//     return "Good night";
//   }
// };

// const getRandomLoginMessage = () => {
//   const messages = [
//     "Welcome back!",
//     "Great to see you again!",
//     "You're all set to go!",
//     "Welcome! Let's make today productive.",
//     "Good to have you back!",
//     "Ready to dive in?",
//     "Welcome aboard!",
//     "Time to make things happen!",
//     "Let's get started!",
//     "Welcome back to your workspace!",
//     "Nice to see you again!",
//     "All systems ready!",
//     "Welcome! Hope you're having a great day.",
//     "Back in action!",
//     "Let's accomplish great things today!",
//   ];

//   return messages[Math.floor(Math.random() * messages.length)];
// };

// export default function WelcomeMsg() {
//   const { currentUser } = useContext(UserContext);

//   useEffect(() => {
//     const shouldShow = localStorage.getItem("showWelcomeMsg");

//     if (shouldShow === "true" && currentUser) {
//       toast.dismiss();

//       const timer = setTimeout(() => {
//         const greeting = getTimeBasedGreeting();
//         const randomMessage = getRandomLoginMessage();

//         toast.custom(
//           (t) => (
//             <div
//               className={`${
//                 t.visible ? "animate-enter" : "animate-leave"
//               } max-w-md w-full bg-base-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-base-content ring-opacity-5`}
//             >
//               <div className="flex-1 w-0 p-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 pt-0.5">
//                     <img
//                       className="h-10 w-10 rounded-full"
//                       src="https://i.pinimg.com/736x/f1/54/da/f154da6a5577947ab19cf2766830ba9e.jpg"
//                       alt=""
//                     />
//                   </div>
//                   <div className="ml-3 flex-1">
//                     <p className="text-sm font-medium text-base-content">
//                       {greeting}, {currentUser?.name?.split(" ")[0]}!
//                     </p>
//                     <p className="mt-1 text-sm text-base-content/70">
//                       {randomMessage}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ),
//           {
//             duration: 3000,
//             position: "top-center",
//           }
//         );

//         localStorage.removeItem("showWelcomeMsg");
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [currentUser]);

//   return null;
// }
