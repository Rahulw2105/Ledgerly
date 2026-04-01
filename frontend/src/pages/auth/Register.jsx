import React,{useState} from 'react'
import axios from 'axios';
import './Register.css';
const Register = () => {
  const [form , setForm] = useState({
  name: '',
  businessName: '',
  email: '',
  gstin: '',
  password: ''
});

const [showPassword,setShowPassword] = useState(false);

function handleChange(e) {
    setForm({...form , [e.target.name]: e.target.value});
}

console.log(form);
async   function handleSubmit() {

    try {
      const response = await  axios.post("http://localhost:3000/api/auth/register" , {
      name: form.name,
      businessName: form.businessName,
      email: form.email,
      gstin: form.gstin,
      password: form.password
    })
    console.log(response);
} 
catch (err) {
    console.log(err.message)
}
}
  return (
    <>
    <div className="register-page">
        <div className='register-left'>
            
             <h1>Ledgerly </h1>

             <div className="headline">
                  <h1>Your finances, finally under control.</h1>
    <p>Join thousands of Indian freelancers who save 6+ hours a month on bookkeeping.</p>
            </div>
            
             <div className="features">
    <div className="feature-item">
      <div className="feature-icon">✓</div>
      <div>
        <strong>AI-Powered OCR Scanning</strong>
        <p>Upload receipts and invoices — AI extracts everything automatically</p>
      </div>
    </div>
      
  </div>
            
        </div>
        <div className="register-right">
  <div className="form-box">
    <h2>Create your account</h2>
    <p>Start your free account. No credit card needed.</p>

    <div className="name-row">
      <div className="input-group">
        <label>First Name <span>*</span></label>
        <input type="text" name="name" placeholder="Rahul Sharma" value={form.name} onChange={handleChange}/>
      </div>
      <div className="input-group">
        <label>businessName <span className="optional">(optional)</span></label>
        <input type="text" name="businessName"placeholder="Rahul Freelance" value={form.businessName} onChange={handleChange}/>
      </div>
    </div>

    <div className="input-group">
      <label>Email address <span>*</span></label>
      <input type="email" name="email" placeholder="rahul@example.com" value={form.email} onChange={handleChange} />
    </div>

    <div className="input-group">
      <label>GSTIN <span className="optional">(optional — add later)</span></label>
      <input type="text" name="gestIn"placeholder="22AAAAA0000A1Z5" onChange={handleChange} value={form.gstin} />
    </div>

    <div className="input-group">
      <label>Password <span>*</span></label>
      <input type="password"name="password" placeholder="••••••••••"  onChange={handleChange} value={form.password}/>
    </div>

    <button className="submit-btn" onClick={handleSubmit}> Create Free Account</button>
    <p className="signin-link">Already have an account? <a href="#">Sign In</a></p>
  </div>
</div>
       </div>
    </>
  )
}

export default Register;
