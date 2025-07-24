// 1. ส่วนของ Firebase
// ----------------------------------------------------

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjLBl1sEGgQLyng51rW25b434bJ0opVc4",
  authDomain: "myapplication-bd04c034.firebaseapp.com",
  databaseURL: "https://myapplication-bd04c034-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "myapplication-bd04c034",
  storageBucket: "myapplication-bd04c034.firebasestorage.app",
  messagingSenderId: "49782830313",
  appId: "1:49782830313:web:c81b5d86a937f22d296c78",
  measurementId: "G-Z2ZBWGB245"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// 2. ส่วนการทำงานของเว็บไซต์
// ----------------------------------------------------

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
        });
        
        // Toggle current FAQ
        if (!isActive) {
            question.classList.add('active');
            answer.classList.add('active');
        }
    });
});

// Contact Form Submission (เชื่อมต่อกับ Firebase)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้า
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // เพิ่มข้อมูล timestamp
    data.timestamp = new Date().toISOString();

    // ส่งข้อมูลไปที่ Firebase Realtime Database
    // โดยสร้าง "collection" ชื่อ "contacts" และใช้ push() เพื่อสร้าง ID ที่ไม่ซ้ำกัน
    db.ref('contacts').push(data)
        .then(() => {
            // เมื่อสำเร็จ
            alert('ขอบคุณสำหรับข้อความของคุณ! เราจะติดต่อกลับภายใน 24 ชั่วโมง');
            document.getElementById('contactForm').reset(); // Reset form
        })
        .catch((error) => {
            // เมื่อเกิดข้อผิดพลาด
            console.error("เกิดข้อผิดพลาดในการส่งข้อมูล: ", error);
            alert('เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง');
        });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.contact-card, .faq-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});