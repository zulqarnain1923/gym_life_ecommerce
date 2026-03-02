import React from 'react'


export const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-900   ${className}`}>
    {children}
  </div>
);


export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition ${className}`} >
    {children}
  </button>
);

export const Input = ({ ...props }) => (
  <input
    {...props}
    className="border p-2 rounded-xl w-full bg-gray-300 dark:border-gray-600"/>
);

export const Badge = ({ children, type }) => {
  let color = "bg-green-500";

  if (type === "low") color = "bg-yellow-500";
  if (type === "out") color = "bg-red-500";

  return (
    <span className={`${color} text-white px-2  rounded-lg text-sm`}>
      {children}
    </span>
  );
};


