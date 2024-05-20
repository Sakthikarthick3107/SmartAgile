// import React, { useState } from "react";
// import slogo from "../assets/slogo.png";
// import { useNavigate } from "react-router-dom";

// const Organization = () => {
//   const [formData, setFormData] = useState({
//     organization_name: "",
//     organization_email: "",
//     organization_website: "",
//     organization_address: "",
//     owner_name: "",
//     owner_email: "",
//     owner_number: "",
//     password: "",
//     confirm_password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleBackClick = () => {
//     // Navigate to the sign up page
//     navigate("/Login");
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length === 0) {
//       console.log("Form submitted:", formData); // Storing form values in console
//       // Add your form submission logic here
//       setFormData({
//         organization_name: "",
//         organization_email: "",
//         organization_website: "",
//         organization_address: "",
//         owner_name: "",
//         owner_email: "",
//         owner_number: "",
//         password: "",
//         confirm_password: "",
//       });
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const validateForm = (data) => {
//     let errors = {};

//     if (!data.organization_name.trim()) {
//       errors.organization_name = "Organization name is required";
//     }

//     if (!data.organization_email.trim()) {
//       errors.organization_email = "Organization email is required";
//     } else if (!/\S+@\S+\.\S+/.test(data.organization_email)) {
//       errors.organization_email = "Invalid email address";
//     }

//     if (!data.organization_website.trim()) {
//       errors.organization_website = "Organization website is required";
//     } else if (!/^https?:\/\/\S+$/.test(data.organization_website)) {
//       errors.organization_website = "Invalid website URL";
//     }

//     if (!data.organization_address.trim()) {
//       errors.organization_address = "Organization address is required";
//     }

//     if (!data.owner_name.trim()) {
//       errors.owner_name = "Owner name is required";
//     }

//     if (!data.owner_email.trim()) {
//       errors.owner_email = "Owner email is required";
//     } else if (!/\S+@\S+\.\S+/.test(data.owner_email)) {
//       errors.owner_email = "Invalid email address";
//     }

//     if (!data.owner_number.trim()) {
//       errors.owner_number = "Owner mobile number is required";
//     } else if (!/^\d{10}$/.test(data.owner_number)) {
//       errors.owner_number = "Invalid mobile number";
//     }

//     if (!data.password.trim()) {
//       errors.password = "Password is required";
//     } else if (data.password.length < 8) {
//       errors.password = "Password must be at least 8 characters long";
//     } else if (!/[A-Z]/.test(data.password)) {
//       errors.password = "Password must contain at least one capital letter";
//     } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(data.password)) {
//       errors.password = "Password must contain at least one special character";
//     } else if (!/\d/.test(data.password)) {
//       errors.password = "Password must contain at least one number";
//     }

//     if (!data.confirm_password.trim()) {
//       errors.confirm_password = "Confirm password is required";
//     } else if (data.confirm_password !== data.password) {
//       errors.confirm_password = "Passwords do not match";
//     }

//     return errors;
//   };

//   return (
//     <div className="bg-bgfirst w-[100vw] min-h-screen flex justify-center items-center">
//       <div className=" bg-white lg:w-3/5 xl:w-2/5 rounded-3xl p-8">
//         <div className="flex justify-center mb-6">
//           <img src={slogo} alt="Logo" className="w-20" />
//         </div>
//         <h2 className="text-3xl font-semibold text-black text-center mb-4">
//           New Organization
//         </h2>
//         <hr className="border-black mb-8" />
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-wrap justify-between "
//         >
//           {/* Left side form fields (tablet and above) */}
//           <div className="w-full lg:w-6/12 pl-2 pr-2">
//             <div className="mb-6">
//               <label
//                 htmlFor="organization_name"
//                 className="block text-sm font-semibold text-black text-lg mb-1"
//               >
//                 Organization Name
//               </label>
//               <input
//                 type="text"
//                 name="organization_name"
//                 value={formData.organization_name}
//                 onChange={handleInputChange}
//                 className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
//                   errors.organization_name ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.organization_name && (
//                 <span className="text-red-500">{errors.organization_name}</span>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="organization_email"
//                 className="block text-sm font-semibold text-black text-lg mb-1"
//               >
//                 Organization Email
//               </label>
//               <input
//                 type="email"
//                 name="organization_email"
//                 value={formData.organization_email}
//                 onChange={handleInputChange}
//                 className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
//                   errors.organization_email ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.organization_email && (
//                 <span className="text-red-500">
//                   {errors.organization_email}
//                 </span>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="organization_website"
//                 className="block text-sm font-semibold text-black text-lg mb-1"
//               >
//                 Organization Website
//               </label>
//               <input
//                 type="text"
//                 name="organization_website"
//                 value={formData.organization_website}
//                 onChange={handleInputChange}
//                 className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
//                   errors.organization_website ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.organization_website && (
//                 <span className="text-red-500">
//                   {errors.organization_website}
//                 </span>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="organization_address"
//                 className="block text-sm font-semibold text-black text-lg mb-1"
//               >
//                 Organization Address
//               </label>
//               <textarea
//                 name="organization_address"
//                 value={formData.organization_address}
//                 onChange={handleInputChange}
//                 className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
//                   errors.organization_address ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.organization_address && (
//                 <span className="text-red-500">
//                   {errors.organization_address}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Right side form fields (tablet and above) */}
//           <div className="w-full lg:w-6/12 pl-2 pr-2">
//             <div className="mb-6">
//               <label
//                 htmlFor="owner_name"
//                 className="block text-sm font-semibold text-black text-lg mb-1"
//               >
//                 Owner Name
//               </label>
//               <input
//                 type="text"
//                 name="owner_name"
//                 value={formData.owner_name}
//                 onChange={handleInputChange}
//                 className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
//                   errors.owner_name ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.owner_name && (
//                 <span className="text-red-500">{errors.owner_name}</span>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="owner_email"
//                 className="block text-sm font-semibold text-black text-lg mb-1"
//               >
//                 Owner Email
//               </label>
//               <input
//                 type="email"
//                 name="owner_email"
//                 value={formData.owner_email}
//                 onChange={handleInputChange}
//                 className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
//                   errors.owner_email ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.owner_email && (
//                 <span className="text-red-500">{errors.owner_email}</span>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="owner_number"
//                 className="block text-sm font-semibold text-black text-lg mb-1"
//               >
//                 Owner Mobile Number
//               </label>
//               <input
//                 type="tel"
//                 name="owner_number"
//                 value={formData.owner_number}
//                 onChange={handleInputChange}
//                 className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
//                   errors.owner_number ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.owner_number && (
//                 <span className="text-red-500">{errors.owner_number}</span>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-semibold text-black text-lg mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
//                   errors.password ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.password && (
//                 <span className="text-red-500">{errors.password}</span>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="confirm_password"
//                 className="block text-sm font-semibold text-black text-lg mb-1"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 name="confirm_password"
//                 value={formData.confirm_password}
//                 onChange={handleInputChange}
//                 className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
//                   errors.confirm_password ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.confirm_password && (
//                 <span className="text-red-500">{errors.confirm_password}</span>
//               )}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="w-full flex justify-center mt-5">
//             <button
//               type="button"
//               className="bg-bgfirst text-white text-lg px-6 py-2 rounded-xl mr-4"
//               onClick={handleBackClick}
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               className="bg-bgfirst text-white text-lg px-6 py-2 rounded-xl"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Organization;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slogo from '../assets/slogo.png';

const Organization = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationEmail: '',
    organizationWebsite: '',
    ownerName: '',
    ownerEmail: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBackClick = () => {
    navigate("/login");
  };

  const validateForm = () => {
    let formErrors = {};
    // Add validation conditions here, e.g., check for empty fields, invalid email format, etc.
    return formErrors;
  };

  const createSuperuser = async () => {
    const response = await fetch("http://127.0.0.1:8000/users/employees/superuser/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.ownerName,
        email: formData.ownerEmail,
        password: formData.password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('superuser', JSON.stringify(data));  // Store superuser data
    }
    return data;
  };

  const createOrganization = async (ownerId) => {
    const response = await fetch("http://127.0.0.1:8000/organization/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        org_name: formData.organizationName,
        org_mail: formData.organizationEmail,
        org_website: formData.organizationWebsite,
        owner: ownerId,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('organization', JSON.stringify(data));  // Store organization data
    }
    return data;
  };

  const createUserProfile = async (userId, orgId) => {
    const response = await fetch("http://127.0.0.1:8000/users/employee/profile", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userId,
        organization: orgId,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('userProfile', JSON.stringify(data));  // Store user profile data
    } 
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const superuserResponse = await createSuperuser();
        if (superuserResponse.status === 201) {
          const orgResponse = await createOrganization(superuserResponse.id);
          if (orgResponse.status === 200) {
            const profileResponse = await createUserProfile(superuserResponse.id, orgResponse.data.org_id);
            if (profileResponse.status === 201) {
              alert('New Organization created successfully');
              navigate('/dashboard'); // or wherever you want to redirect
            }
          }
        }
      } catch (error) {
        console.error('Failed to create organization:', error);
        alert('Failed to create organization.');
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="bg-bgfirst w-[100vw] min-h-screen flex justify-center items-center">
      <div className=" bg-white lg:w-3/5 xl:w-2/5 rounded-3xl p-8">
        <div className="flex justify-center mb-6">
          <img src={slogo} alt="Logo" className="w-20" />
        </div>
        <h2 className="text-3xl font-semibold text-black text-center mb-4">
          New Organization
        </h2>
        <hr className="border-black mb-8" />
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
  {/* Left side form fields (tablet and above) */}
  <div className="w-full lg:w-6/12 pl-2 pr-2">
    {/* Organization Name */}
    <div className="mb-6">
      <label htmlFor="organizationName" className="block text-sm font-semibold text-black text-lg mb-1">
        Organization Name
      </label>
      <input
        type="text"
        name="organizationName"
        value={formData.organizationName}
        onChange={handleInputChange}
        className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
          errors.organizationName ? "border-red-500" : ""
        }`}
        placeholder="Enter organization name"
      />
      {errors.organizationName && (
        <span className="text-red-500">{errors.organizationName}</span>
      )}
    </div>

    {/* Organization Email */}
    <div className="mb-6">
      <label htmlFor="organizationEmail" className="block text-sm font-semibold text-black text-lg mb-1">
        Organization Email
      </label>
      <input
        type="email"
        name="organizationEmail"
        value={formData.organizationEmail}
        onChange={handleInputChange}
        className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
          errors.organizationEmail ? "border-red-500" : ""
        }`}
        placeholder="Enter organization email"
      />
      {errors.organizationEmail && (
        <span className="text-red-500">{errors.organizationEmail}</span>
      )}
    </div>

    {/* Organization Website */}
    <div className="mb-6">
      <label htmlFor="organizationWebsite" className="block text-sm font-semibold text-black text-lg mb-1">
        Organization Website
      </label>
      <input
        type="url"
        name="organizationWebsite"
        value={formData.organizationWebsite}
        onChange={handleInputChange}
        className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
          errors.organizationWebsite ? "border-red-500" : ""
        }`}
        placeholder="Enter website URL"
      />
      {errors.organizationWebsite && (
        <span className="text-red-500">{errors.organizationWebsite}</span>
      )}
    </div>

    <div className="mb-6">
               <label
                 htmlFor="organization_address"
                className="block text-sm font-semibold text-black text-lg mb-1"
              >
                Organization Address
              </label>
              <textarea
                name="organization_address"
                value={formData.organization_address}
                onChange={handleInputChange}
                className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
                  errors.organization_address ? "border-red-500" : ""
                
                }`}
                placeholder="Enter the address"
              />
              {errors.organization_address && (
                <span className="text-red-500">
                  {errors.organization_address}
                </span>
              )}
            </div>
         
  </div>

  

  {/* Right side form fields (tablet and above) */}
  <div className="w-full lg:w-6/12 pl-2 pr-2">
    {/* Owner Name */}
    <div className="mb-6">
      <label htmlFor="ownerName" className="block text-sm font-semibold text-black text-lg mb-1">
        Owner Name
      </label>
      <input
        type="text"
        name="ownerName"
        value={formData.ownerName}
        onChange={handleInputChange}
        className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
          errors.ownerName ? "border-red-500" : ""
        }`}
        placeholder="Enter owner's name"
      />
      {errors.ownerName && (
        <span className="text-red-500">{errors.ownerName}</span>
      )}
    </div>

    {/* Owner Email */}
    <div className="mb-6">
      <label htmlFor="ownerEmail" className="block text-sm font-semibold text-black text-lg mb-1">
        Owner Email
      </label>
      <input
        type="email"
        name="ownerEmail"
        value={formData.ownerEmail}
        onChange={handleInputChange}
        className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
          errors.ownerEmail ? "border-red-500" : ""
        }`}
        placeholder="Enter owner's email"
      />
      {errors.ownerEmail && (
        <span className="text-red-500">{errors.ownerEmail}</span>
      )}
    </div>

    {/* Password */}
    <div className="mb-6">
      <label htmlFor="password" className="block text-sm font-semibold text-black text-lg mb-1">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
          errors.password ? "border-red-500" : ""
        }`}
        placeholder="Create password"
      />
      {errors.password && (
        <span className="text-red-500">{errors.password}</span>
      )}
    </div>

    <div className="mb-6">
               <label
                htmlFor="confirm_password"
                className="block text-sm font-semibold text-black text-lg mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
                  errors.confirm_password ? "border-red-500" : ""
                }`}
                placeholder="Confirm password"
              />
              {errors.confirm_password && (
                <span className="text-red-500">{errors.confirm_password}</span>
              )}
            </div>
  </div>

  {/* Buttons */}
  <div className="w-full flex justify-center mt-5">
    <button
      type="button"
      className="bg-bgfirst text-white text-lg px-6 py-2 rounded-xl mr-4"
      onClick={handleBackClick}
    >
      Back
    </button>
    <button
      type="submit"
      className="bg-bgfirst text-white text-lg px-6 py-2 rounded-xl"
    >
      Save
    </button>
  </div>
</form>

        </form>
      </div>
    </div>
  );
};

export default Organization;
