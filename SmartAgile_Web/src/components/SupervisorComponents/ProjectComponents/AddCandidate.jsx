import React, { useState } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaUser,
  FaIdBadge,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaAddressCard,
  FaUpload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddCandidate = () => {
  const navigate = useNavigate();
  const [designation, setDesignation] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    contactNumber: "",
    department: "",
    dob: "",
    joiningDate: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setFormData({ ...formData, uploadedImage: file });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Employee name is required";
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.joiningDate) newErrors.joiningDate = "Joining date is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!designation) newErrors.designation = "Designation is required";
    if (!uploadedImage) newErrors.uploadedImage = "Image is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        formDataToSend.append("designation", designation);
        formDataToSend.append("image", formData.uploadedImage);

        const response = await axios.post("/api/candidates", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Form data saved: ", response.data);
        navigate("/success");  // Navigate to a success page or display a success message
      } catch (error) {
        console.error("Error saving form data: ", error);
      }
    } else {
      console.log("Validation failed");
    }
  };

  const onBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="mt-0px pb-[10px] pt-[10px] pl-[165px] pr-[95px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center bg-[#4d989d] text-white px-4 focus:outline-none py-2 rounded-lg"
          onClick={onBackClick}
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <hr className="w-[300px] mt-[60px] border-[#4d989d] border-b-[2px]  mr-[40px]" />
        <h2 className="text-2xl font-bold text-[#4d989d] mr-[75px] mt-[60px]">
          Add Candidate
        </h2>
        <hr className="w-[300px] mt-[60px] border-[#4d989d] border-b-[2px] mr-[150px]" />
        <div className="invisible">Placeholder</div>
      </div>

      {/* Form */}
      <div className="text-black font-semibold">
        <form className="grid gap-6" onSubmit={handleSaveClick}>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {/* First Column */}
            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 w-[500px]">
              <FaUser className="text-grey-600 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent p-2 focus:outline-none placeholder-black opacity"
                placeholder="Employee Name"
                required
              />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>

            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 w-[500px]">
              <FaIdBadge className="text-grey-600 mr-2" />
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full bg-transparent p-2 focus:outline-none placeholder-black"
                placeholder="Employee ID"
                required
              />
              {errors.employeeId && <span className="text-red-500">{errors.employeeId}</span>}
            </div>

            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 w-[500px]">
              <FaBriefcase className="text-grey mr-2" />
              <select
                name="designation"
                className="w-full bg-transparent p-2 focus:outline-none placeholder-black"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              >
                <option value="">Designation</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Java Developer">Java Developer</option>
                <option value="Desktop">Desktop</option>
                <option value="AI Developer">AI Developer</option>
                <option value="Mobile">Mobile</option>
              </select>
              {errors.designation && <span className="text-red-500">{errors.designation}</span>}
            </div>

            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 w-[500px]">
              <FaPhone className="text-grey mr-2" />
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full bg-transparent p-2 focus:outline-none placeholder-black"
                placeholder="Contact Number"
                required
              />
              {errors.contactNumber && <span className="text-red-500">{errors.contactNumber}</span>}
            </div>

            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 w-[500px]">
              <FaBuilding className="text-grey-600 mr-2" />
              <select
                name="department"
                className="w-full bg-transparent p-2 focus:outline-none placeholder-black"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Department</option>
                <option value="Frontend">DR</option>
                <option value="Backend">IN</option>
                <option value="Java Developer">AS</option>
              </select>
              {errors.department && <span className="text-red-500">{errors.department}</span>}
            </div>

            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 w-[500px]">
              <FaBirthdayCake className="text-grey-600 mr-2" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full bg-transparent p-2 focus:outline-none placeholder-black"
                required
              />
              {errors.dob && <span className="text-red-500">{errors.dob}</span>}
            </div>

            {/* Second Column */}
            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 w-[500px]">
              <FaCalendarAlt className="text-grey-600 mr-2" />
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full bg-transparent p-2 focus:outline-none placeholder-black"
                required
              />
              {errors.joiningDate && <span className="text-red-500">{errors.joiningDate}</span>}
            </div>

            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 w-[500px]">
              <FaEnvelope className="text-grey-600 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent p-2 focus:outline-none placeholder-black"
                placeholder="Email ID"
                required
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>

            {/* Image upload */}
            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 relative w-[500px]">
              <input
                type="file"
                id="fileUpload"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                required
              />
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center cursor-pointer"
              >
                <FaUpload className="text-grey-600 mb-2 mt-2 ml-0 mr-2 " />
                <span className="text-grey-600 mb-2 ml-2 mr-5">Upload Image</span>
              </label>
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="mt-4 w-[200px] h-[200px] object-cover rounded-lg"
                />
              )}
              {errors.uploadedImage && <span className="text-red-500">{errors.uploadedImage}</span>}
            </div>

            <div className="flex items-center bg-[#4d989d] bg-opacity-35 rounded-lg shadow-md p-2 w-[500px] ml-[px]">
              <FaAddressCard className="text-grey-600 mr-2 mb-[70px]" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-transparent p-2 focus:outline-none placeholder-black"
                rows="4"
                placeholder="Address"
                required
              />
              {errors.address && <span className="text-red-500">{errors.address}</span>}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-[#4d989d] text-white px-6 py-2 rounded-lg mr-40 focus:outline-none"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
