import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    surname: '',
    gender: '',
    courseName: '',
    duration: '',
    currentYear: '',
    instituteName: '',
    affiliatedUniversity: '',
    feePayable: '',
    fathersName: '',
    mothersName: '',
    address: '',
    city: '',
    pin: '',
    state: '',
    whatsappNo: '',
    alternateMobileNo: '',
    email: '',
    education: [
      { course: '10th standard', school: '', year: '', marks: '', percentage: '' },
      { course: '11th standard', school: '', year: '', marks: '', percentage: '' },
      { course: '12th standard', school: '', year: '', marks: '', percentage: '' },
    ],
    family: [
      { name: '', age: '', relationship: '', education: '', occupation: '', income: '' },
      { name: '', age: '', relationship: '', education: '', occupation: '', income: '' },

    ],
    earningMembers: '',
    monthlyIncome: '',
    dependents: '',
    agricultureIncome: '',
    educationFunding: '',
    financialAssistance: [{ name: '', amount: '', year: '' }],
    govtScheme: '',
    schemeName: '',
    schemeApproved: '',
    benefitAmount: '',
    houseOwnership: '',
    houseType: '',
    rooms: '',
    rent: '',
    agriculturalLand: '',
    landSize: '',
    medicalHistory: [
      { name: '', nonHospitalizedIllness: '', nonHospitalizedTimes: '', nonHospitalizedExpenses: '', hospitalizedIllness: '', hospitalizedTimes: '', hospitalizedExpenses: '' }
    ],
    studentSignature: '',
    parentSignature: '',
    date: '',
    parentName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeArray = (index, e, key) => {
    const { name, value } = e.target;
    const updatedArray = formData[key].map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData({ ...formData, [key]: updatedArray });
  };

  const handleFamilyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFamily = formData.family.map((member, i) =>
      i === index ? { ...member, [name]: value } : member
    );
    setFormData({ ...formData, family: updatedFamily });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <h1>Student Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h2>Student details</h2>
          <div className="form-group">
            
            <label>
              First Name:
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>
            <label>
              Middle Name:
              <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} required />
            </label>
            <label>
              Surname:
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
            </label>
            <label>
              Gender:
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            
            <label>
              Name of the Institute:
              <input type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} required />
            </label>
            <label>
              Course Name:
              <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required />
            </label>
            <label>
              Total Duration (in years):
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
            </label>
            <label>
              Currently in Which Year of the Course:
              <input type="text" name="currentYear" value={formData.currentYear} onChange={handleChange} required />
            </label>
            
            <label>
              Affiliated by University:
              <input type="text" name="affiliatedUniversity" value={formData.affiliatedUniversity} onChange={handleChange} required />
            </label>
            <label>
              Current Year Fee Payable (after deductions):
              <input type="number" name="feePayable" value={formData.feePayable} onChange={handleChange} required />
            </label>
            <label>
              Father's Full Name:
              <input type="text" name="fathersName" value={formData.fathersName} onChange={handleChange} required />
            </label>
            <label>
              Mother's Full Name:
              <input type="text" name="mothersName" value={formData.mothersName} onChange={handleChange} required />
            </label>
            <label>
              Complete Postal Address:
              <textarea name="address" value={formData.address} onChange={handleChange} required />
            </label>
            <label>
              City:
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </label>
            <label>
              PIN:
              <input type="text" name="pin" value={formData.pin} onChange={handleChange} required />
            </label>
            <label>
              State:
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </label>
            <label>
              WhatsApp No.:
              <input type="text" name="whatsappNo" value={formData.whatsappNo} onChange={handleChange} required />
            </label>
            <label>
              Alternate Mobile No.:
              <input type="text" name="alternateMobileNo" value={formData.alternateMobileNo} onChange={handleChange} required />
            </label>
            <label>
              E-mail ID:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
          </div>
        </div>

        <div className="section">
          <h2>Educational Information</h2>
          <div className="form-group">
            {formData.education.map((edu, index) => (
              <div key={index}>
                <label>
                  Completed Course:
                  <input type="text" name={`education[${index}].course`} value={edu.course} onChange={handleChangeArray} required />
                </label>
                <label>
                  Name of School / College:
                  <input type="text" name={`education[${index}].school`} value={edu.school} onChange={handleChangeArray} required />
                </label>
                <label>
                  Year of Passing:
                  <input type="number" name={`education[${index}].year`} value={edu.year} onChange={handleChangeArray} required />
                </label>
                <label>
                  Total Marks Obtained:
                  <input type="number" name={`education[${index}].marks`} value={edu.marks} onChange={handleChangeArray} required />
                </label>
                <label>
                  Percentage:
                  <input type="number" name={`education[${index}].percentage`} value={edu.percentage} onChange={handleChangeArray} required />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Family Information</h2>
          <div className="form-group">
            {formData.family.map((member, index) => (
              <div key={index}>
                <label>
                  Name of the Family Member:
                  <input type="text" name={`family[${index}].name`} value={member.name} onChange={(e) => handleFamilyChange(index, e)} required />
                </label>
                <label>
                  Age:
                  <input type="number" name={`family[${index}].age`} value={member.age} onChange={(e) => handleFamilyChange(index, e)} required />
                </label>
                <label>
                  Relationship with Student:
                  <input type="text" name={`family[${index}].relationship`} value={member.relationship} onChange={(e) => handleFamilyChange(index, e)} required />
                </label>
                <label>
                  Educational Status:
                  <input type="text" name={`family[${index}].education`} value={member.education} onChange={(e) => handleFamilyChange(index, e)} required />
                </label>
                <label>
                  Occupation:
                  <input type="text" name={`family[${index}].occupation`} value={member.occupation} onChange={(e) => handleFamilyChange(index, e)} required />
                </label>
                <label>
                  Monthly Income (Rs):
                  <input type="number" name={`family[${index}].income`} value={member.income} onChange={(e) => handleFamilyChange(index, e)} required />
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
