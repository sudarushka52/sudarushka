document.addEventListener('DOMContentLoaded', function() {
    // Управление прайс-группами
    document.querySelectorAll('.price-group-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const groupId = this.getAttribute('data-group');
            const table = document.getElementById(`group${groupId}`);
            
            // Закрываем все другие группы
            document.querySelectorAll('.price-table').forEach(t => {
                if (t.id !== `group${groupId}`) {
                    t.style.display = 'none';
                    t.previousElementSibling.classList.remove('active');
                }
            });

            // Открываем/закрываем текущую
            if (table.style.display === 'block') {
                table.style.display = 'none';
                this.classList.remove('active');
            } else {
                table.style.display = 'block';
                this.classList.add('active');
            }
        });
    });

    // Видео-слайдер
    const sliderTrack = document.querySelector('.slider-track');
    const videoItems = document.querySelectorAll('.video-item');
    const prevBtn = document.querySelector('.left-arrow');
    const nextBtn = document.querySelector('.right-arrow');
    let currentIndex = 0;
    const itemCount = videoItems.length;

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        videoItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Свайпы для мобильных
    let touchStartX = 0;
    let touchEndX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }
        if (touchEndX > touchStartX + 50) {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
            updateSlider();
        }
    }

    updateSlider();

    function createEucalyptusElements() {
        document.querySelectorAll('.price-group-btn').forEach(btn => {
            // Создаем листья эвкалипта
            for (let i = 0; i < 6; i++) {
                const leaf = document.createElement('div');
                leaf.className = 'eucalyptus-leaf';
                leaf.style.setProperty('--rotation', `${i * 60}deg`);
                leaf.style.top = `${20 + Math.random() * 60}%`;
                leaf.style.left = `${Math.random() * 80}%`;
                leaf.style.zIndex = '5'; // Листья под текстом
                leaf.style.animationDelay = `${i * 0.2}s`;
                
                // Сохраняем оригинальный clip-path в data-атрибут
                leaf.setAttribute('data-clip-path', 'M40,0 C50,10 70,30 75,60 C75,80 60,100 40,110 C20,100 5,80 5,60 C10,30 30,10 40,0 Z');
                
                btn.appendChild(leaf);
            }

            // Создаем веточки
            for (let i = 0; i < 4; i++) {
                const twig = document.createElement('div');
                twig.className = 'eucalyptus-twig';
                twig.style.transform = `rotate(${i * 90 + 45}deg)`;
                twig.style.top = `${30 + i * 15}%`;
                twig.style.left = `${40 + i * 10}%`;
                twig.style.transitionDelay = `${i * 0.15}s`;
                twig.style.zIndex = '4'; // Веточки под текстом
                btn.appendChild(twig);
            }

            // Добавляем капли росы
            for (let i = 0; i < 3; i++) {
                const dewDrop = document.createElement('div');
                dewDrop.className = 'dew-drop';
                dewDrop.style.top = `${20 + i * 25}%`;
                dewDrop.style.left = `${15 + i * 30}%`;
                dewDrop.style.animationDelay = `${i * 1}s`;
                dewDrop.style.zIndex = '3'; // Капли под текстом
                btn.appendChild(dewDrop);
            }
        });
    }

    // Вызовите эту функцию после createNatureAbstractDecorations
    createEucalyptusElements();

    function createTableDecorations() {
        document.querySelectorAll('.price-table').forEach(table => {
            // Создаем декоративные листья для таблицы
            for (let i = 0; i < 2; i++) {
                const leaf = document.createElement('div');
                leaf.className = 'table-leaf-decoration';
                table.appendChild(leaf);
            }
        });
    }

    // Вызовите эту функцию после создания таблиц
    createTableDecorations();

  // Управление раскрывающимися строками
function initServiceRows() {
    const serviceRows = document.querySelectorAll('.service-row');
    let currentlyOpen = null;

    serviceRows.forEach(row => {
        row.addEventListener('click', function() {
            // Закрываем ранее открытую строку
            if (currentlyOpen && currentlyOpen !== this) {
                currentlyOpen.classList.remove('active');
            }
            
            // Переключаем текущую строку
            this.classList.toggle('active');
            
            // Запоминаем открытую строку
            if (this.classList.contains('active')) {
                currentlyOpen = this;
            } else {
                currentlyOpen = null;
            }
        });
    });

    // Закрытие по клику вне строки
    document.addEventListener('click', function(e) {
        if (currentlyOpen && !currentlyOpen.contains(e.target) && 
            !e.target.closest('.service-row')) {
            currentlyOpen.classList.remove('active');
            currentlyOpen = null;
        }
    });
}

// Вызываем функцию
initServiceRows();

// Слайдер преимуществ с эффектами
function initBenefitsSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentSlide = 0;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 секунд

    function goToSlide(slideIndex) {
        // Скрываем все слайды
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Показываем выбранный слайд
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
        
        // Сбрасываем и запускаем прогресс-бар
        progressBar.style.width = '0%';
        progressBar.style.animation = 'none';
        
        setTimeout(() => {
            progressBar.style.animation = `progress ${slideDuration}ms linear, progressGlow 2s ease-out`;
            progressBar.style.width = '100%';
        }, 50);
        
        currentSlide = slideIndex;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Обработчики событий
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Пауза при наведении
    const sliderWrapper = document.querySelector('.slider-wrapper');
    sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.addEventListener('mouseleave', startAutoSlide);

    // Запуск
    startAutoSlide();
}

// Инициализация слайдера
initBenefitsSlider();


// 3D Карусель отзывов
function initReviewsCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const reviewCards = document.querySelectorAll('.review-card');
    const indicators = document.querySelectorAll('.indicator');
    const arrowUp = document.querySelector('.arrow-up');
    const arrowDown =document.querySelector('.arrow-down');
    
    let currentIndex = 2; // Начинаем с центральной карточки (3я из 5)
    let autoScrollInterval;
    const scrollDuration = 8000; // 8 секунд

    // Функция обновления карусели
    function updateCarousel() {
        // Сбрасываем все активные состояния
        reviewCards.forEach(card => card.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Устанавливаем активную карточку
        reviewCards[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
        
        // Обновляем 3D позиционирование всех карточек
        updateCardPositions();
    }

    // Функция для 3D позиционирования карточек
    function updateCardPositions() {
        reviewCards.forEach((card, index) => {
            const offset = index - currentIndex;
            let transform, opacity, zIndex, scale;
            
            switch(offset) {
                case -2: // Самая верхняя
                    transform = `translateY(-200%) scale(0.7) rotateX(10deg)`;
                    opacity = 0.3;
                    zIndex = 1;
                    break;
                case -1: // Верхняя боковая
                    transform = `translateY(-100%) scale(0.85) rotateX(5deg)`;
                    opacity = 0.6;
                    zIndex = 2;
                    break;
                case 0: // Активная центральная
                    transform = `translateY(0) scale(1) rotateX(0)`;
                    opacity = 1;
                    zIndex = 5;
                    break;
                case 1: // Нижняя боковая
                    transform = `translateY(100%) scale(0.85) rotateX(-5deg)`;
                    opacity = 0.6;
                    zIndex = 2;
                    break;
                case 2: // Самая нижняя
                    transform = `translateY(200%) scale(0.7) rotateX(-10deg)`;
                    opacity = 0.3;
                    zIndex = 1;
                    break;
                default:
                    // Для карточек вне видимости
                    transform = `translateY(${offset > 0 ? 300 : -300}%) scale(0.5)`;
                    opacity = 0;
                    zIndex = 0;
            }
            
            card.style.transform = transform;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
        });
    }

    // Функция перехода к следующему отзыву
    function nextReview() {
        currentIndex = (currentIndex + 1) % reviewCards.length;
        updateCarousel();
    }

    // Функция перехода к предыдущему отзыву
    function prevReview() {
        currentIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
        updateCarousel();
    }

    // Функция перехода к конкретному отзыву
    function goToReview(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Автопрокрутка
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextReview, scrollDuration);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Обработчики событий для стрелок
    arrowDown.addEventListener('click', () => {
        stopAutoScroll();
        nextReview();
        startAutoScroll();
    });

    arrowUp.addEventListener('click', () => {
        stopAutoScroll();
        prevReview();
        startAutoScroll();
    });

    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoScroll();
            goToReview(index);
            startAutoScroll();
        });
    });

    // Свайпы для мобильных
    let touchStartY = 0;
    let touchEndY = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
        stopAutoScroll();
    }, false);

    carouselTrack.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
        startAutoScroll();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndY < touchStartY - swipeThreshold) {
            // Свайп вниз - следующий отзыв
            nextReview();
        }
        if (touchEndY > touchStartY + swipeThreshold) {
            // Свайп вверх - предыдущий отзыв
            prevReview();
        }
    }

    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            stopAutoScroll();
            nextReview();
            startAutoScroll();
        }
        if (e.key === 'ArrowUp') {
            stopAutoScroll();
            prevReview();
            startAutoScroll();
        }
    });

    // Пауза при наведении
    const carouselWrapper = document.querySelector('.reviews-carousel-wrapper');
    carouselWrapper.addEventListener('mouseenter', stopAutoScroll);
    carouselWrapper.addEventListener('mouseleave', startAutoScroll);

    // Инициализация
    updateCarousel();
    startAutoScroll();

    // Адаптация при ресайзе окна
    window.addEventListener('resize', updateCardPositions);
}

// Инициализация карусели
initReviewsCarousel();


}); // Конец DOMContentLoaded