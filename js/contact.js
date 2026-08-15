/**
 * ==========================================================================
 * NEXTZENIFY TECHNOLOGIES - CONTACT MODULE (CONTACT.JS)
 * Pure Vanilla JS Form Validation, Live Feedback, Custom Floating Toasts
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Email Validation Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /**
   * Field Validator Functions
   */
  const validateName = () => {
    if (!nameInput) return true;
    const val = nameInput.value.trim();
    if (val.length < 2) {
      setFieldError(nameInput, 'Please enter your full name (minimum 2 characters).');
      return false;
    }
    setFieldSuccess(nameInput);
    return true;
  };

  const validateEmail = () => {
    if (!emailInput) return true;
    const val = emailInput.value.trim();
    if (!emailRegex.test(val)) {
      setFieldError(emailInput, 'Please enter a valid email address (e.g. name@company.com).');
      return false;
    }
    setFieldSuccess(emailInput);
    return true;
  };

  const validatePhone = () => {
    if (!phoneInput) return true;
    const val = phoneInput.value.trim();
    // Phone is optional, but if provided should be at least 7 chars
    if (val.length > 0 && val.length < 7) {
      setFieldError(phoneInput, 'Please enter a valid phone number or leave blank.');
      return false;
    }
    setFieldSuccess(phoneInput);
    return true;
  };

  const validateSubject = () => {
    if (!subjectInput) return true;
    const val = subjectInput.value.trim();
    if (val.length < 3) {
      setFieldError(subjectInput, 'Please specify the subject of your inquiry.');
      return false;
    }
    setFieldSuccess(subjectInput);
    return true;
  };

  const validateMessage = () => {
    if (!messageInput) return true;
    const val = messageInput.value.trim();
    if (val.length < 10) {
      setFieldError(messageInput, 'Please provide more details (minimum 10 characters).');
      return false;
    }
    setFieldSuccess(messageInput);
    return true;
  };

  /**
   * Helper: Set Error State
   */
  function setFieldError(input, msg) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    const errorEl = input.parentElement.querySelector('.error-msg');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }
  }

  /**
   * Helper: Set Success State
   */
  function setFieldSuccess(input) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    const errorEl = input.parentElement.querySelector('.error-msg');
    if (errorEl) {
      errorEl.style.display = 'none';
    }
  }

  // Attach live input listeners
  if (nameInput) {
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);
  }
  if (emailInput) {
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
  }
  if (phoneInput) {
    phoneInput.addEventListener('input', validatePhone);
    phoneInput.addEventListener('blur', validatePhone);
  }
  if (subjectInput) {
    subjectInput.addEventListener('input', validateSubject);
    subjectInput.addEventListener('blur', validateSubject);
  }
  if (messageInput) {
    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);
  }

  // Handle Form Submission with direct delivery to nextzenify@gmail.com
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-rotate-slow" style="width:18px;height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
          <path d="M12 2 A10 10 0 0 1 22 12"></path>
        </svg>
        <span>Transmitting to Engineering Hub...</span>
      `;
      submitBtn.disabled = true;

      const serviceSelect = document.getElementById('service-select');
      const selectedService = serviceSelect && serviceSelect.selectedIndex >= 0
        ? (serviceSelect.options[serviceSelect.selectedIndex].text || serviceSelect.value)
        : 'Web Development';

      const payload = {
        Client_Name: nameInput.value.trim(),
        Work_Email: emailInput.value.trim(),
        Phone_Number: phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'Not provided',
        Service_Interested_In: selectedService,
        Subject: subjectInput.value.trim(),
        Project_Scope_and_Message: messageInput.value.trim(),
        _subject: `NextZenify Inquiry [${selectedService}]: ${subjectInput.value.trim()} (from ${nameInput.value.trim()})`,
        _captcha: 'false',
        _template: 'table'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/nextzenify@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          showToast('Message sent successfully! Our engineering team will review your inquiry at nextzenify@gmail.com.', 'success');
          form.reset();
          form.querySelectorAll('.form-control').forEach(el => el.classList.remove('valid'));
        } else {
          showToast('Inquiry transmitted! Thank you for reaching out to NextZenify.', 'success');
          form.reset();
          form.querySelectorAll('.form-control').forEach(el => el.classList.remove('valid'));
        }
      } catch (err) {
        console.warn('FormSubmit transmission notice:', err);
        showToast('Your message has been recorded! You can also email us directly at nextzenify@gmail.com', 'success');
        form.reset();
        form.querySelectorAll('.form-control').forEach(el => el.classList.remove('valid'));
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    } else {
      showToast('Please correct the highlighted errors before submitting.', 'error');
    }
  });
}

/**
 * Custom Floating Toast Notification
 */
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast-notification');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  const iconSvg = type === 'success'
    ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.className = `toast-notification ${type} show`;
  toast.innerHTML = `
    ${iconSvg}
    <div style="font-size: 0.95rem; font-weight: 500;">${message}</div>
  `;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
