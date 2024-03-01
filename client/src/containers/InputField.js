// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useState } from 'react';


// const TextArea = ({ autoFocus, multiline, ...multilineProps }) => multiline ?
//     <textarea autoFocus={autoFocus}
//         {...multilineProps}
//         style={{ ...multilineProps.style, minWidth: '300px' }} /> :
//     <input {...multilineProps} />

// const InputField = ({ inputStyle = {}, multiline, disabled = false, className,
//     autoFocus = false,
//     showEyeIcon = false, name, type, placeholder,
//     onChange, error, maxLength, defaultValue = '',
//     suffixIcon = null, ...props }) => {
//     const [showPassword, setShowPassword] = useState(false);
//     return (<>
//         <TextArea 
//             {...props}
//             multiline={multiline}
//             autoFocus={autoFocus}
//             disabled={disabled}
//             className="form-control"
//             type={(() => {
//                 if (showPassword && type === 'password') {
//                     return 'text'
//                 } else {
//                     return type || 'text';
//                 }
//             })()}
//             name={name}
//             defaultValue={defaultValue}
//             placeholder={placeholder}
//             onChange={({ target: { value, name } }) => onChange(value, name)}
//             maxLength={maxLength}
//         />
//         {
//             suffixIcon && <div>
//                 {suffixIcon}
//             </div>
//         }
//         {
//             showEyeIcon && <div className="eye-icn ">
//                 <div>
//                     <FontAwesomeIcon
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             setShowPassword(s => !s)
//                         }}
//                         style={{ cursor: 'pointer' }}
//                         icon={showPassword ? faEye : faEyeSlash} />
//                 </div>
//             </div>
//         }
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//     </>)
// }

// export default InputField;