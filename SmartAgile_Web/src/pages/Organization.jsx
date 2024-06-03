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
    confirmPassword: '',
    organizationAddress: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const baseUrl = "http://127.0.0.1:8000";

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

  const createOrganization = async () => {
    const superuser = {
      username: formData.ownerName,
      email: formData.ownerEmail,
      password: formData.password,
    };

    try {
      const createSuperuser = await fetch(`${baseUrl}/users/employees/superuser/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(superuser),
      });
      const superuserResponse = await createSuperuser.json();
      console.log('Superuser response:', superuserResponse);

      if (createSuperuser.status === 201) {
        const newOrganization = {
          org_name: formData.organizationName,
          org_mail: formData.organizationEmail,
          org_website: formData.organizationWebsite,
          owner: superuserResponse.id,
        };

        const postNewOrganization = await fetch(`${baseUrl}/organization/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrganization),
        });
        const orgResponse = await postNewOrganization.json();
        console.log('Organization response:', orgResponse);

        if (postNewOrganization.status === 200 && orgResponse.message === 'successfully created') {
          const profileStatus = {
            user: superuserResponse.id,
            organization: orgResponse.data.org_id,
          };

          const userProfileCreate = await fetch(`${baseUrl}/users/employee/profile`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileStatus),
          });
          const profileResponse = await userProfileCreate.json();
          console.log('Profile response:', profileResponse);

          if (userProfileCreate.status === 201) {
            // Store data in local storage
            const organizationData = {
              organizationName: formData.organizationName,
              organizationEmail: formData.organizationEmail,
              organizationWebsite: formData.organizationWebsite,
              ownerName: formData.ownerName,
              ownerEmail: formData.ownerEmail,
              organizationAddress: formData.organizationAddress,
              orgId: orgResponse.data.org_id,
              ownerId: superuserResponse.id,
            };
            localStorage.setItem('organizationData', JSON.stringify(organizationData));

            console.log('Organization data saved to local storage:', organizationData);

            alert('New Organization created successfully');
            navigate('/login');
          } else {
            throw new Error('Failed to create user profile');
          }
        } else {
          throw new Error('Failed to create organization');
        }
      } else {
        throw new Error('Failed to create superuser');
      }
    } catch (error) {
      console.error('Failed to create organization:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      createOrganization();
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="bg-bgfirst w-[100vw] min-h-screen flex justify-center items-center">
      <div className="bg-white lg:w-3/5 xl:w-2/5 rounded-3xl p-8">
        <div className="flex justify-center mb-6">
          <img src={slogo} alt="Logo" className="w-20" />
        </div>
        <h2 className="text-3xl font-semibold text-black text-center mb-4">
          New Organization
        </h2>
        <hr className="border-black mb-8" />
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
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
            {/* Organization Address */}
            <div className="mb-6">
              <label htmlFor="organizationAddress" className="block text-sm font-semibold text-black text-lg mb-1">
                Organization Address
              </label>
              <textarea
                name="organizationAddress"
                value={formData.organizationAddress}
                onChange={handleInputChange}
                className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
                  errors.organizationAddress ? "border-red-500" : ""
                }`}
                placeholder="Enter the address"
              />
              {errors.organizationAddress && (
                <span className="text-red-500">{errors.organizationAddress}</span>
              )}
            </div>
          </div>
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
            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-black text-lg mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full border border-gray-500 rounded-md bg-gray-100 p-2 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword}</span>
              )}
            </div>
          </div>
          <div className="w-full mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
            <button
              type="button"
              onClick={handleBackClick}
              className="w-full mt-4 bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Organization;
