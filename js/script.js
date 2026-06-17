const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('akbankUser'));
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');
    const userDisplayName = document.getElementById('userDisplayName');
    
    if (user) {
        if (authButtons) authButtons.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
        if (userDisplayName) userDisplayName.textContent = `Hoşgeldiniz, ${user.name}!`;
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('akbankUser');
        updateAuthUI();
        alert('Başarıyla çıkış yapıldı. Hoşça kalın!');
    });
}

const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');
const loginFeedback = document.getElementById('loginFeedback');
const regFeedback = document.getElementById('regFeedback');

if(loginBtn && loginModal) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
        if(loginFeedback) loginFeedback.textContent = '';
    });
}

if(registerBtn && registerModal) {
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'block';
        if(regFeedback) regFeedback.textContent = '';
    });
}

if(closeLogin) {
    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
        if(loginFeedback) loginFeedback.textContent = '';
    });
}

if(closeRegister) {
    closeRegister.addEventListener('click', () => {
        registerModal.style.display = 'none';
        if(regFeedback) regFeedback.textContent = '';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        if(loginFeedback) loginFeedback.textContent = '';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
        if(regFeedback) regFeedback.textContent = '';
    }
});

const loginForm = document.getElementById('loginForm');
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('loginName').value.trim();
        const tc = document.getElementById('loginId').value.trim();
        const password = document.getElementById('loginPass').value.trim();
        
        if (!name) {
            loginFeedback.style.color = "red";
            loginFeedback.textContent = "Lütfen ad soyad giriniz!";
            return;
        }
        
        if (name.length < 3) {
            loginFeedback.style.color = "red";
            loginFeedback.textContent = "Ad soyad en az 3 karakter olmalıdır!";
            return;
        }
        
        if (!tc) {
            loginFeedback.style.color = "red";
            loginFeedback.textContent = "Lütfen T.C. Kimlik Numarası giriniz!";
            return;
        }
        
        if (!password) {
            loginFeedback.style.color = "red";
            loginFeedback.textContent = "Lütfen şifre giriniz!";
            return;
        }
        
        if (tc.length !== 11) {
            loginFeedback.style.color = "red";
            loginFeedback.textContent = "T.C. Kimlik No 11 hanede olmalıdır!";
            return;
        }
        
        if (!/^\d+$/.test(tc)) {
            loginFeedback.style.color = "red";
            loginFeedback.textContent = "T.C. Kimlik No sadece rakamlardan oluşmalıdır!";
            return;
        }
        
        if (password.length < 6) {
            loginFeedback.style.color = "red";
            loginFeedback.textContent = "Şifre en az 6 karakter olmalıdır!";
            return;
        }
        
        const user = {
            tc: tc,
            name: name
        };
        
        localStorage.setItem('akbankUser', JSON.stringify(user));
        
        loginFeedback.style.color = "#27AE60";
        loginFeedback.textContent = "✓ Giriş başarılı! Yönlendiriliyorsunuz...";
        loginFeedback.style.fontWeight = "bold";
        
        setTimeout(() => {
            loginModal.style.display = 'none';
            loginForm.reset();
            updateAuthUI();
            alert('Akbanklı olarak başarıyla giriş yaptınız! Hoşgeldiniz, ' + name + '!');
        }, 1500);
    });
}

const registerForm = document.getElementById('registerForm');
if(registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value.trim();
        const tc = document.getElementById('regTc').value.trim();
        const phone = document.getElementById('regPhone').value.trim();
        
        if (!name) {
            regFeedback.style.color = "red";
            regFeedback.textContent = "Lütfen ad soyad giriniz!";
            return;
        }
        
        if (name.length < 3) {
            regFeedback.style.color = "red";
            regFeedback.textContent = "Ad soyad en az 3 karakter olmalıdır!";
            return;
        }
        
        if (!tc) {
            regFeedback.style.color = "red";
            regFeedback.textContent = "Lütfen T.C. Kimlik Numarası giriniz!";
            return;
        }
        
        if (tc.length !== 11) {
            regFeedback.style.color = "red";
            regFeedback.textContent = "T.C. Kimlik No 11 hanede olmalıdır!";
            return;
        }
        
        if (!/^\d+$/.test(tc)) {
            regFeedback.style.color = "red";
            regFeedback.textContent = "T.C. Kimlik No sadece rakamlardan oluşmalıdır!";
            return;
        }
        
        if (!phone) {
            regFeedback.style.color = "red";
            regFeedback.textContent = "Lütfen cep telefonu giriniz!";
            return;
        }
        
        if (!/^05\d{9}$/.test(phone.replace(/\s/g, ''))) {
            regFeedback.style.color = "red";
            regFeedback.textContent = "Lütfen geçerli bir cep telefonu giriniz! (05XX XXX XX XX)";
            return;
        }
        
        const user = {
            tc: tc,
            name: name,
            phone: phone,
            joinDate: new Date().toLocaleDateString('tr-TR')
        };
        
        localStorage.setItem('akbankUser', JSON.stringify(user));
        
        regFeedback.style.color = "#27AE60";
        regFeedback.textContent = "✓ Üyelik başarılı! Yönlendiriliyorsunuz...";
        regFeedback.style.fontWeight = "bold";
        
        setTimeout(() => {
            registerModal.style.display = 'none';
            registerForm.reset();
            updateAuthUI();
            alert('Akbanklı olarak başarıyla kayıt oldunuz! Hoşgeldiniz, ' + name + '!');
        }, 1500);
    });
}

const searchData = [
    { title: "Bireysel Bankacılık", description: "İhtiyaç kredilerinden vadeli hesaplara", page: "index.html", keywords: ["bireysel", "bankacılık", "kredi"] },
    { title: "Dijital Bankacılık", description: "Akbank Mobil ve İnternet şubesi", page: "index.html", keywords: ["dijital", "mobil", "internet"] },
    { title: "Kobi & Ticari Bankacılık", description: "İşletmenizi büyütmek için ticari krediler", page: "index.html", keywords: ["kobi", "ticari", "işletme"] },
    { title: "İhtiyaç Kredisi", description: "Eğitim, sağlık, evlilik planlarınız için", page: "krediler.html", keywords: ["ihtiyaç", "kredi", "taşıt"] },
    { title: "Konut Kredisi", description: "120 aya varan uzun vadeler", page: "krediler.html", keywords: ["konut", "ev", "emlak"] },
    { title: "Axess Kredi Kartı", description: "Harcama yapan her müşteriye chip-para", page: "kredi-kartlari.html", keywords: ["axess", "kart", "chip-para"] },
    { title: "Wings Kredi Kartı", description: "Seyahatlerinizde çift mil kazandıran kart", page: "kredi-kartlari.html", keywords: ["wings", "mil", "seyahat"] },
    { title: "Kampanyalar", description: "Güncel kampanyalar ve fırsatlar", page: "kampanyalar.html", keywords: ["kampanya", "fırsat", "indirim"] },
    { title: "Hakkımızda", description: "Akbank'ın tarihçesi ve vizyonu", page: "hakkimizda.html", keywords: ["hakkımızda", "tarih", "akbank"] },
    { title: "İletişim", description: "Bize ulaşın ve sorunlarınızı çözün", page: "iletisim.html", keywords: ["iletişim", "destek", "telefon"] }
];

function performSearch(query) {
    const lowerQuery = query.toLowerCase().trim();
    const results = [];
    
    searchData.forEach(item => {
        const titleMatch = item.title.toLowerCase().includes(lowerQuery);
        const descMatch = item.description.toLowerCase().includes(lowerQuery);
        const keywordMatch = item.keywords.some(kw => kw.includes(lowerQuery));
        
        if (titleMatch || descMatch || keywordMatch) {
            results.push(item);
        }
    });
    
    return results;
}

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

if(searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if(query !== "") {
            const results = performSearch(query);
            if(results.length > 0) {
                let resultText = `"${query}" için ${results.length} sonuç bulundu:\n\n`;
                results.forEach((result, index) => {
                    resultText += `${index + 1}. ${result.title}\n${result.description}\n`;
                });
                resultText += `\nSayfaya yönlendirilmek istiyor musunuz?`;
                if(confirm(resultText)) {
                    window.location.href = results[0].page;
                }
            } else {
                alert(`"${query}" için sonuç bulunamadı.\n\nAramayı deneyin: kredi, kart, kampanya, iletişim`);
            }
            searchInput.value = "";
        } else {
            alert("Lütfen aramak istediğiniz kelimeyi girin.");
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

const sliderTrack = document.getElementById('heroSliderTrack');
const dots = document.querySelectorAll('.dot');
let currentSlideIndex = 0;
let slideInterval;

function goToSlide(index) {
    if (!sliderTrack) return;
    currentSlideIndex = index;
    
    sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

window.currentSlide = function(index) {
    goToSlide(index);
    resetInterval();
};

window.changeSlide = function(direction) {
    let nextIndex = currentSlideIndex + direction;
    if (nextIndex >= dots.length) {
        nextIndex = 0;
    } else if (nextIndex < 0) {
        nextIndex = dots.length - 1;
    }
    goToSlide(nextIndex);
    resetInterval();
};

function startInterval() {
    if (!sliderTrack) return;
    slideInterval = setInterval(() => {
        let nextIndex = (currentSlideIndex + 1) % dots.length;
        goToSlide(nextIndex);
    }, 5000); 
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

if (sliderTrack) {
    startInterval();
}

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === "" || message === "") {
            formFeedback.style.color = "red";
            formFeedback.textContent = "Lütfen ad soyad ve mesaj alanlarını boş bırakmayınız!";
        } else {
            formFeedback.style.color = "green";
            formFeedback.textContent = "✓ Mesajınız başarıyla alınmıştır. Teşekkür ederiz!";
            contactForm.reset();
            
            setTimeout(() => {
                formFeedback.textContent = "";
            }, 5000);
        }
    });
}
