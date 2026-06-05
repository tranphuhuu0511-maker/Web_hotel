// ===== MÃ CHÍNH (MAIN JAVASCRIPT) =====
// Mục đích file này:
// - Cung cấp dữ liệu demo tĩnh: `hotelsData`, `roomsData`
// - Hiển thị danh sách khách sạn, chi tiết khách sạn và phòng
// - Quản lý giỏ đặt phòng / yêu thích và quy trình thanh toán
// - Xử lý khuyến mãi nhẹ (promo)
// - Các hàm tiện ích dùng cho giao diện admin (formatPrice, showToast)
//
// Ghi chú:
// - Giữ `hotelsData` và `roomsData` ở scope toàn cục (admin.js sử dụng)
// - Các hàm quan trọng được xuất qua `window.LuxApp` để dễ sử dụng
// DEBUG: bộ đếm toàn cục cho số lần gọi loadHotels
window.__HOTELS_LOADED_CALLS__ = window.__HOTELS_LOADED_CALLS__ || 0;
const hotelsData = [
    {
        id: 1,
        name: "InterContinental Đà Nẵng Sun Peninsula Resort",
        location: "danang",
        address: "Sơn Trà, Đà Nẵng",
        stars: 5,
        price: 5500000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        amenities: ["pool", "wifi", "buffet", "parking"],
        description: "Resort sang trọng 5 sao với view biển tuyệt đẹp, thiết kế độc đáo bởi Bill Bensley.",
        rating: 4.8,
        hot: true,
        gallery: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
        ]
    },
    {
        id: 2,
        name: "Ana Mandara Nha Trang Resort",
        location: "nhatrang",
        address: "Trần Phú, Nha Trang",
        stars: 5,
        price: 3200000,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
        amenities: ["pool", "wifi", "buffet", "parking"],
        description: "Resort bãi biển với không gian xanh mát và dịch vụ hoàn hảo.",
        rating: 4.7,
        hot: true,
        gallery: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
        ]
    },
    {
        id: 3,
        name: "Dalat Palace Heritage Hotel",
        location: "dalat",
        address: "Trần Phú, Đà Lạt",
        stars: 5,
        price: 2800000,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        amenities: ["wifi", "buffet", "parking"],
        description: "Khách sạn cổ điển với kiến trúc Pháp, view hồ Xuân Hương.",
        rating: 4.6,
        hot: false,
        gallery: [
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
        ]
    },
    {
        id: 4,
        name: "Hotel Nikko Saigon",
        location: "hcm",
        address: "Nguyễn Huệ, Q1, TP.HCM",
        stars: 5,
        price: 3500000,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
        amenities: ["pool", "wifi", "buffet", "parking"],
        description: "Khách sạn 5 sao tại trung tâm Sài Gòn với view sông tuyệt đẹp.",
        rating: 4.7,
        hot: true,
        gallery: [
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800"
        ]
    },
    {
        id: 5,
        name: "Sofitel Legend Metropole Hanoi",
        location: "hanoi",
        address: "Hoàn Kiếm, Hà Nội",
        stars: 5,
        price: 4200000,
        image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800",
        amenities: ["pool", "wifi", "buffet", "parking"],
        description: "Khách sạn lịch sử với kiến trúc thuộc địa Pháp độc đáo.",
        rating: 4.9,
        hot: true,
        gallery: [
            "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800"
        ]
    },
    {
        id: 6,
        name: "JW Marriott Phu Quoc Emerald Bay",
        location: "phuquoc",
        address: "Khem Beach, Phú Quốc",
        stars: 5,
        price: 6000000,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
        amenities: ["pool", "wifi", "buffet", "parking"],
        description: "Resort sang trọng bên bãi biển riêng tư tuyệt đẹp.",
        rating: 4.8,
        hot: true,
        gallery: [
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"
        ]
    },
    {
        id: 7,
        name: "Sunrise Premium Resort Hoi An",
        location: "danang",
        address: "Cửa Đại, Hội An",
        stars: 4,
        price: 2200000,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        amenities: ["pool", "wifi", "buffet"],
        description: "Resort 4 sao với không gian yên tĩnh và giá cả hợp lý.",
        rating: 4.5,
        hot: false,
        gallery: [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
        ]
    },
    {
        id: 8,
        name: "Terracotta Hotel & Resort Dalat",
        location: "dalat",
        address: "Phường 4, Đà Lạt",
        stars: 4,
        price: 1800000,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        amenities: ["wifi", "parking"],
        description: "Khách sạn phong cách Địa Trung Hải giữa lòng Đà Lạt.",
        rating: 4.4,
        hot: false,
        gallery: [
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
        ]
    }
];

const roomsData = [
    {
        id: 1,
        hotelId: 1,
        name: "Deluxe Ocean View",
        type: "deluxe",
        price: 5500000,
        maxGuests: 2,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        amenities: ["Giường King", "Ban công view biển", "Bồn tắm", "Minibar"],
        description: "Phòng sang trọng với view biển tuyệt đẹp"
    },
    {
        id: 2,
        hotelId: 1,
        name: "Suite Peninsula",
        type: "suite",
        price: 8500000,
        maxGuests: 4,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
        amenities: ["2 Phòng ngủ", "Phòng khách", "Bồn tắm Jacuzzi", "Butler"],
        description: "Suite cao cấp với không gian rộng rãi"
    },
    {
        id: 3,
        hotelId: 2,
        name: "Garden View Room",
        type: "standard",
        price: 3200000,
        maxGuests: 2,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        amenities: ["Giường Queen", "View vườn", "Wifi"],
        description: "Phòng tiêu chuẩn với view vườn xanh mát"
    },
    {
        id: 4,
        hotelId: 2,
        name: "Beachfront Villa",
        type: "suite",
        price: 7200000,
        maxGuests: 4,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
        amenities: ["Hồ bơi riêng", "3 Phòng ngủ", "Bếp", "View biển"],
        description: "Villa sang trọng ngay bên bãi biển"
    }
];

// ===== DOCUMENT READY - ULTRA FIX VERSION =====
$(document).ready(function() {
    console.log('✅ DOM sẵn sàng - Khởi tạo các chức năng...');
    console.log('📍 URL hiện tại:', window.location.href);
    console.log('📍 Đường dẫn hiện tại:', window.location.pathname);

    // Initialize core functions
    initSlideshow();
    updateCartCount();
    setupScrollToTop();
    setupFilters();
    setupPromotions();
    setupSearchForm();
    setupSmoothScroll();
    checkPageAndLoad();
    renderFavoritesList();
    markFavoriteButtons();

    // Wire favorites checkout button
    $('#favoritesCheckoutBtn').off('click').on('click', function() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites || favorites.length === 0) {
            showToast('Chưa có mục yêu thích nào để thanh toán', 'warning');
            return;
        }
        const cart = favorites.map(f => ({
            roomId: f.roomId,
            hotelId: f.hotelId,
            roomName: f.roomName,
            hotelName: f.hotelName,
            price: f.price,
            image: f.image,
            quantity: 1
        }));
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        window.location.href = 'checkout.html';
    });
    showUserInNav();

    // --- ĐOẠN CODE CHO TRANG HOTEL-DETAIL (merged) ---
    $('#quickBookingForm').off('submit').on('submit', function (e) {
        e.preventDefault();
        const checkIn = $(this).find('input[type="date"]').eq(0).val();
        const checkOut = $(this).find('input[type="date"]').eq(1).val();
        const guests = $(this).find('input[type="number"]').val();
        
        if (new Date(checkIn) >= new Date(checkOut)) {
            alert('Ngày trả phòng phải sau ngày nhận phòng!');
            return;
        }

        const pricePerNight = parseInt($('#priceDisplay').text().replace(/[^0-9]/g, ''), 10) || 0;
        const bookingData = {
            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests,
            hotelName: $('#hotelHeader h2').text() || 'Khách sạn LuxStay',
            pricePerNight: pricePerNight
        };

        sessionStorage.setItem('bookingDetails', JSON.stringify(bookingData));
        window.location.href = 'checkout.html';
    });

    // --- ĐOẠN CODE CHO TRANG CHECKOUT (merged) ---
    if (window.location.pathname.includes('checkout.html')) {
        const savedBooking = sessionStorage.getItem('bookingDetails');

        if (savedBooking) {
            const data = JSON.parse(savedBooking);

            // Hiển thị tóm tắt đơn hàng
            const summaryHTML = `
                <h6 class="card-title fw-bold">${data.hotelName}</h6>
                <p class="mb-1"><i class="fas fa-calendar-alt text-muted me-2"></i><strong>Nhận phòng:</strong> ${data.checkIn}</p>
                <p class="mb-1"><i class="fas fa-calendar-alt text-muted me-2"></i><strong>Trả phòng:</strong> ${data.checkOut}</p>
                <p class="mb-0"><i class="fas fa-users text-muted me-2"></i><strong>Số khách:</strong> ${data.guests} người</p>
            `;
            $('#checkoutSummary').html(summaryHTML);

            // Tính toán tiền mẫu
            const pricePerNight = data.pricePerNight || 1200000; 
            const date1 = new Date(data.checkIn);
            const date2 = new Date(data.checkOut);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);

            let subtotal = pricePerNight * diffDays;

            // Apply active promo if present
            const activePromo = JSON.parse(sessionStorage.getItem('activePromo') || 'null');
            if (activePromo && activePromo.code && activePromo.discount) {
                const minN = Number(activePromo.minNights || 0);
                if (!minN || diffDays >= minN) {
                    const discountAmount = Math.round(subtotal * Number(activePromo.discount));
                    subtotal = Math.max(0, subtotal - discountAmount);
                    $('#checkoutSummary').append(`<div class="d-flex justify-content-between mb-2 text-success"><span>Giảm giá (${activePromo.code})</span><span>-${new Intl.NumberFormat('vi-VN').format(discountAmount)}₫</span></div>`);
                }
            }

            const tax = subtotal * 0.1;
            const total = subtotal + tax;

            const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

            // Đổ dữ liệu ra giao diện checkout
            $('#checkoutSubtotal').text(formatCurrency(subtotal));
            $('#checkoutTax').text(formatCurrency(tax));
            $('#checkoutTotal').text(formatCurrency(total));
        } else {
            // If there is a cart (favorites -> checkout), render summary from cart
            const cart = getCart();
            if (cart && cart.length > 0) {
                // Use the unified checkout renderer
                loadCheckoutSummary();
            } else {
                alert('Không tìm thấy thông tin đặt phòng, vui lòng thử lại.');
                window.location.href = 'index.html';
            }
        }
    }

    // SỬA KHẨN CẤP 1: Ép load hotels trên trang chính với độ trễ ngắn
    setTimeout(function() {
        if ($('#hotelsList').length > 0) {
            console.log('🏨 Tìm thấy #hotelsList - Đang tải khách sạn...');
            console.log('📊 Dữ liệu khách sạn:', hotelsData.length, 'khách sạn');
            loadHotels();

            // Double-check after loading
            setTimeout(function() {
                const loadedCount = $('#hotelsList').children().length;
                console.log('✅ Số khách sạn đã tải:', loadedCount);
                if (loadedCount === 0) {
                    console.warn('⚠️ WARNING: No hotels loaded! Trying again...');
                    loadHotels();
                }
            }, 500);
        } else {
            console.log('ℹ️ Không tìm thấy #hotelsList trên trang này');
        }
    }, 100);
});

// ADDITIONAL FORCE LOAD ON WINDOW LOAD
$(window).on('load', function() {
    console.log('🌐 Cửa sổ đã tải hoàn tất');

    // Force load hotels if container exists but is empty
    if ($('#hotelsList').length > 0 && $('#hotelsList').children().length === 0) {
        console.log('🔄 Ép tải khách sạn (window.load)...');
        loadHotels();
    }
});

// ===== HERO SLIDESHOW (jQuery) =====
let currentSlideIndex = 0;
let slideInterval;

function initSlideshow() {

    if ($('.slide').length === 0) return;

    showSlide(currentSlideIndex);

    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// ===== PROMOTIONS (simple) =====
function setupPromotions() {
    // Details modal
    $(document).on('click', '.promo-details', function() {
        const $btn = $(this);
        const title = $btn.data('title') || 'Khuyến mãi';
        const desc = $btn.data('desc') || '';
        const code = $btn.data('promo-code') || '';
        $('#promoModalTitle').text(title + (code ? ` — ${code}` : ''));
        $('#promoModalBody').html(`<p>${desc}</p><p><strong>Mã: </strong>${code}</p>`);
        $('#promoApplyBtn').data('promo', JSON.stringify({ code: code, title: title, desc: desc, discount: $btn.data('discount') || 0 }));
        const modal = new bootstrap.Modal($('#promoModal')[0]);
        modal.show();
    });

    // Apply from modal
    $(document).on('click', '#promoApplyBtn', function() {
        const promo = $(this).data('promo');
        if (promo) {
            try { const p = JSON.parse(promo); applyPromo(p); } catch(e){}
        }
        const modalEl = document.getElementById('promoModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    });

    // Direct apply (e.g., "Đặt ngay")
    $(document).on('click', '.promo-apply', function() {
        const $btn = $(this);
        const promo = { code: $btn.data('promo-code') || '', discount: Number($btn.data('discount') || 0), minNights: Number($btn.data('min-nights') || 1), title: $btn.data('title') || '', desc: $btn.data('desc') || '' };
        applyPromo(promo);
    });
}

function applyPromo(promo) {
    if (!promo || !promo.code) return;
    // Save promo to session so checkout/search can use it
    sessionStorage.setItem('activePromo', JSON.stringify(promo));
    showToast(`Đã áp dụng khuyến mãi ${promo.code}`, 'success');
    // Scroll to search so user can start booking with promo
    if ($('#search').length) {
        $('html, body').animate({ scrollTop: $('#search').offset().top - 80 }, 600);
        // Optionally pre-select filters for promo (simple heuristics)
        if (promo.code === 'BEACH30') {
            $('#location').val('nhatrang').trigger('change');
        }
    }
}

function showSlide(index) {

    const $slides = $('.slide');
    const $dots = $('.dot');

    // reset index
    if (index >= $slides.length) {
        currentSlideIndex = 0;
    }
    else if (index < 0) {
        currentSlideIndex = $slides.length - 1;
    }
    else {
        currentSlideIndex = index;
    }

    // remove active
    $slides.removeClass('active');
    $dots.removeClass('active');

    // add active
    $slides.eq(currentSlideIndex).addClass('active');
    $dots.eq(currentSlideIndex).addClass('active');
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function goToSlide(index) {
    showSlide(index);
}// ===== SEARCH FORM (jQuery) =====
function setupSearchForm() {
    const $searchForm = $('#searchForm');
    if ($searchForm.length === 0) {
        console.log('ℹ️ Không có form tìm kiếm trên trang này');
        return;
    }

    console.log('🔍 Thiết lập form tìm kiếm...');

    const today = new Date().toISOString().split('T')[0];
    $('#checkin, #checkout').attr('min', today);

    $('#checkin').on('change', function() {
        const checkinDate = new Date($(this).val());
        checkinDate.setDate(checkinDate.getDate() + 1);
        $('#checkout').attr('min', checkinDate.toISOString().split('T')[0]);
    });

    $searchForm.on('submit', function(e) {
        e.preventDefault();
        console.log('🔍 Form tìm kiếm đã gửi');

        const location = $('#location').val();
        const checkin = $('#checkin').val();
        const checkout = $('#checkout').val();
        const guests = parseInt($('#guests').val());

        if (!location || !checkin || !checkout) {
            showToast('Vui lòng điền đầy đủ thông tin!', 'warning');
            return;
        }

        if (new Date(checkout) <= new Date(checkin)) {
            showToast('Ngày trả phòng phải sau ngày nhận phòng!', 'error');
            return;
        }

        if (guests < 1 || guests > 10) {
            showToast('Số người phải từ 1-10!', 'error');
            return;
        }

        // Build filters from the filter bar as well
        const filters = {
            location: location,
            checkin: checkin,
            checkout: checkout,
            guests: guests,
            price: $('#priceFilter').val() || '',
            stars: $('#starFilter').val() || '',
            pool: $('#poolFilter').is(':checked'),
            wifi: $('#wifiFilter').is(':checked'),
            buffet: $('#buffetFilter').is(':checked'),
            parking: $('#parkingFilter').is(':checked')
        };

        showToast('Đang tìm kiếm...', 'success');
        loadHotels(filters);
        // Scroll to results
        $('html, body').animate({
            scrollTop: $('#hotels').offset().top - 80
        }, 800);
    });
}

// ===== LOAD HOTELS (jQuery) - ULTRA FIX VERSION =====
function loadHotels(filters = {}) {
    window.__HOTELS_LOADED_CALLS__ = (window.__HOTELS_LOADED_CALLS__ || 0) + 1;
    console.log('🏨 Gọi loadHotels() lần #'+window.__HOTELS_LOADED_CALLS__+' với bộ lọc:', filters);


    const $hotelsList = $('#hotelsList');
    if ($hotelsList.length === 0) {
        console.warn('⚠️ #hotelsList element not found!');
        return;
    }

    console.log('📋 Tổng khách sạn trong dữ liệu:', hotelsData.length);

    let filteredHotels = [...hotelsData];

    // Apply filters
    if (filters.price) {
        const [min, max] = filters.price.split('-').map(Number);
        filteredHotels = filteredHotels.filter(h => h.price >= min && h.price <= max);
        console.log('💰 Bộ lọc giá đã áp dụng:', filteredHotels.length, 'khách sạn');
    }

    if (filters.stars) {
        filteredHotels = filteredHotels.filter(h => h.stars == filters.stars);
        console.log('⭐ Bộ lọc sao đã áp dụng:', filteredHotels.length, 'khách sạn');
    }

    if (filters.pool) {
        filteredHotels = filteredHotels.filter(h => h.amenities.includes('pool'));
    }

    if (filters.wifi) {
        filteredHotels = filteredHotels.filter(h => h.amenities.includes('wifi'));
    }

    if (filters.buffet) {
        filteredHotels = filteredHotels.filter(h => h.amenities.includes('buffet'));
    }

    if (filters.parking) {
        filteredHotels = filteredHotels.filter(h => h.amenities.includes('parking'));
    }

    console.log('📊 Số khách sạn sau khi lọc:', filteredHotels.length);

    // Clear existing content
    $hotelsList.empty();

    // Generate hotel cards
    $.each(filteredHotels, function(index, hotel) {
        const amenitiesHTML = hotel.amenities.map(a => {
            const icons = {
                pool: 'fa-swimming-pool',
                wifi: 'fa-wifi',
                buffet: 'fa-utensils',
                parking: 'fa-parking'
            };
            return `<span class="amenity-tag"><i class="fas ${icons[a]}"></i></span>`;
        }).join('');

        const starsHTML = Array(hotel.stars).fill('<i class="fas fa-star"></i>').join('');

        const cardHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="hotel-card card">
                    ${hotel.hot ? '<span class="hotel-badge">HOT</span>' : ''}
                        <button class="favorite-btn" data-hotelid="${hotel.id}" onclick="toggleFavorite(${hotel.id})">
                            <i class="far fa-heart"></i>
                        </button>
                    <img src="${hotel.image}" class="card-img-top" alt="${hotel.name}">
                    <div class="card-body">
                        <h5 class="card-title">${hotel.name}</h5>
                        <div class="hotel-rating mb-2">
                            ${starsHTML}
                            <span class="ms-2">(${hotel.rating})</span>
                        </div>
                        <p class="text-muted mb-2">
                            <i class="fas fa-map-marker-alt"></i> ${hotel.address}
                        </p>
                        <div class="amenities-list mb-3">
                            ${amenitiesHTML}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="hotel-price">
                                ${formatPrice(hotel.price)}₫
                                <small class="d-block text-muted" style="font-size:0.8rem">/đêm</small>
                            </div>
                            <a href="hotel-detail.html?id=${hotel.id}" class="btn btn-primary">
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $hotelsList.append(cardHTML);
    });

    console.log('✅ Tải khách sạn thành công! Số thẻ thêm:', filteredHotels.length);
    // Update favorite buttons state after rendering
    if (typeof markFavoriteButtons === 'function') {
        markFavoriteButtons();
    }
}

// ===== FILTERS (jQuery) =====
function setupFilters() {
    const $priceFilter = $('#priceFilter');
    const $starFilter = $('#starFilter');
    const $poolFilter = $('#poolFilter');
    const $wifiFilter = $('#wifiFilter');
    const $buffetFilter = $('#buffetFilter');
    const $parkingFilter = $('#parkingFilter');

    if ($priceFilter.length === 0) {
        console.log('ℹ️ Không có bộ lọc trên trang này');
        return;
    }

    console.log('🎛️ Thiết lập bộ lọc...');

    function applyFilters() {
        console.log('🎛️ Đang áp dụng bộ lọc...');
        const filters = {
            price: $priceFilter.val() || '',
            stars: $starFilter.val() || '',
            pool: $poolFilter.is(':checked'),
            wifi: $wifiFilter.is(':checked'),
            buffet: $buffetFilter.is(':checked'),
            parking: $parkingFilter.is(':checked')
        };
        loadHotels(filters);
    }

    $priceFilter.on('change', applyFilters);
    $starFilter.on('change', applyFilters);
    $poolFilter.on('change', applyFilters);
    $wifiFilter.on('change', applyFilters);
    $buffetFilter.on('change', applyFilters);
    $parkingFilter.on('change', applyFilters);
}

// ===== CHECK PAGE AND LOAD (jQuery) - ULTRA FIX VERSION =====
function checkPageAndLoad() {
    const path = window.location.pathname;
    console.log('📄 Kiểm tra loại trang:', path);

    // Hotel detail page
    if (path.includes('hotel-detail.html')) {
        console.log('🏨 Trang chi tiết khách sạn');
        loadHotelDetail();
    }

    // Booking page
    if (path.includes('booking.html')) {
        console.log('🛒 Trang giỏ đặt phòng');
        loadCart();
    }

    // Checkout page
    if (path.includes('checkout.html')) {
        console.log('💳 Checkout page detected');
        setTimeout(function() {
            loadCheckoutSummary();
            setupCheckoutForm();
        }, 200);
    }

    // Login page
    if (path.includes('login.html')) {
        console.log('🔐 Login page detected');
        setupAuthForms();
    }

    // Index page
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        console.log('🏠 Index page detected');
        // Hotel loading is handled in $(document).ready()
    }
}

// ===== HOTEL DETAIL (jQuery) =====
function loadHotelDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = parseInt(urlParams.get('id'));

    console.log('🏨 Loading hotel detail for ID:', hotelId);

    const hotel = hotelsData.find(h => h.id === hotelId);

    if (!hotel) {
        console.error('❌ Hotel not found!');
        return;
    }

    console.log('✅ Hotel found:', hotel.name);

    $('#hotelBreadcrumb').text(hotel.name);

    const starsHTML = Array(hotel.stars).fill('<i class="fas fa-star text-warning"></i>').join('');
    $('#hotelHeader').html(`
        <h1>${hotel.name}</h1>
        <div class="mb-2">${starsHTML} <span class="ms-2">(${hotel.rating})</span></div>
        <p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${hotel.address}</p>
    `);

    const $hotelGallery = $('#hotelGallery');
    if (hotel.gallery) {
        $.each(hotel.gallery, function(index, img) {
            const colClass = index === 0 ? 'col-12' : 'col-6 col-md-4';
            const height = index === 0 ? '400px' : '200px';
            $hotelGallery.append(`
                <div class="${colClass}">
                    <img src="${img}" class="img-fluid rounded"
                         style="cursor:pointer; height:${height}; width:100%; object-fit:cover;"
                         onclick="openLightbox('${img}')">
                </div>
            `);
        });
    }

    $('#hotelDescription').text(hotel.description);
    $('#priceDisplay').text(formatPrice(hotel.price) + '₫');

    loadRooms(hotelId);
    loadAmenities(hotel);
    loadReviews();
}

function loadRooms(hotelId) {
    const $roomsList = $('#roomsList');
    if ($roomsList.length === 0) return;

    const rooms = roomsData.filter(r => r.hotelId === hotelId);
    console.log('🛏️ Loading rooms for hotel:', hotelId, '- Found:', rooms.length);

    $.each(rooms, function(index, room) {
        const amenitiesHTML = room.amenities.map(a =>
            `<li><i class="fas fa-check text-success"></i> ${a}</li>`
        ).join('');

        $roomsList.append(`
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <img src="${room.image}" class="card-img-top" alt="${room.name}" style="height:200px; object-fit:cover;">
                    <div class="card-body">
                        <h5 class="card-title">${room.name}</h5>
                        <p class="text-muted">${room.description}</p>
                        <ul class="list-unstyled">
                            ${amenitiesHTML}
                        </ul>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong class="text-primary fs-4">${formatPrice(room.price)}₫</strong>
                                <small class="d-block text-muted">/đêm</small>
                            </div>
                            <button class="btn btn-primary" onclick="bookNow(${room.id}, ${hotelId})">
                                <i class="fas fa-cart-plus"></i> Đặt phòng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
}

function loadAmenities(hotel) {
    const $amenitiesList = $('#amenitiesList');
    if ($amenitiesList.length === 0) return;

    const amenitiesMap = {
        pool: { icon: 'fa-swimming-pool', name: 'Hồ bơi' },
        wifi: { icon: 'fa-wifi', name: 'WiFi miễn phí' },
        buffet: { icon: 'fa-utensils', name: 'Nhà hàng buffet' },
        parking: { icon: 'fa-parking', name: 'Bãi đỗ xe' }
    };

    $.each(hotel.amenities, function(index, a) {
        const amenity = amenitiesMap[a];
        $amenitiesList.append(`
            <div class="col-md-4 mb-3">
                <div class="d-flex align-items-center">
                    <i class="fas ${amenity.icon} fa-2x text-primary me-3"></i>
                    <span>${amenity.name}</span>
                </div>
            </div>
        `);
    });
}

function loadReviews() {
    const $reviewsList = $('#reviewsList');
    if ($reviewsList.length === 0) return;

    const reviews = [
        { name: 'Nguyễn Văn A', rating: 5, comment: 'Khách sạn tuyệt vời, phòng sạch sẽ, nhân viên nhiệt tình!', date: '20/05/2024' },
        { name: 'Trần Thị B', rating: 4, comment: 'View đẹp, ăn uống ngon. Giá hơi cao một chút.', date: '18/05/2024' }
    ];

    $.each(reviews, function(index, review) {
        const starsHTML = Array(5).fill(0).map((_, i) =>
            `<i class="fas fa-star ${i < review.rating ? 'text-warning' : 'text-muted'}"></i>`
        ).join('');

        $reviewsList.append(`
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <strong>${review.name}</strong>
                        <small class="text-muted">${review.date}</small>
                    </div>
                    <div class="mb-2">${starsHTML}</div>
                    <p class="mb-0">${review.comment}</p>
                </div>
            </div>
        `);
    });
}

function openLightbox(imgSrc) {
    $('#lightboxImage').attr('src', imgSrc);
    const modal = new bootstrap.Modal($('#lightboxModal')[0]);
    modal.show();
}

// ===== CART MANAGEMENT (jQuery) =====
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(roomId, hotelId) {
    console.log('🛒 Adding to cart - Room:', roomId, 'Hotel:', hotelId);

    const room = roomsData.find(r => r.id === roomId);
    const hotel = hotelsData.find(h => h.id === hotelId);

    if (!room || !hotel) {
        console.error('❌ Room or hotel not found!');
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.roomId === roomId);

    if (existingItem) {
        existingItem.quantity++;
        console.log('📦 Updated quantity:', existingItem.quantity);
    } else {
        cart.push({
            roomId: roomId,
            hotelId: hotelId,
            roomName: room.name,
            hotelName: hotel.name,
            price: room.price,
            image: room.image,
            quantity: 1
        });
        console.log('➕ Added new item to cart');
    }

    saveCart(cart);
    showToast('Đã thêm vào giỏ đặt phòng!', 'success');
}

// Quick booking: save booking details to sessionStorage and go to checkout
function bookNow(roomId, hotelId) {
    console.log('🔖 Quick booking - Room:', roomId, 'Hotel:', hotelId);
    const room = roomsData.find(r => r.id === roomId);
    const hotel = hotelsData.find(h => h.id === hotelId);
    if (!room || !hotel) {
        showToast('Không tìm thấy phòng hoặc khách sạn', 'error');
        return;
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const toISO = d => d.toISOString().split('T')[0];

    const bookingDetails = {
        roomId: room.id,
        hotelId: hotel.id,
        roomName: room.name,
        hotelName: hotel.name,
        pricePerNight: room.price,
        image: room.image || hotel.image || '',
        checkIn: toISO(today),
        checkOut: toISO(tomorrow),
        guests: 1
    };

    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    // Ensure cart is cleared so checkout uses bookingDetails only
    try { localStorage.removeItem('cart'); updateCartCount(); } catch (e) { console.warn('Could not clear cart before quick booking', e); }
    // Redirect to checkout where bookingDetails will be used to build the summary
    window.location.href = 'checkout.html';
}

function removeFromCart(roomId) {
    console.log('🗑️ Removing from cart - Room:', roomId);
    let cart = getCart();
    cart = cart.filter(item => item.roomId !== roomId);
    saveCart(cart);
    loadCart();
}

function updateQuantity(roomId, change) {
    console.log('🔢 Updating quantity - Room:', roomId, 'Change:', change);
    const cart = getCart();
    const item = cart.find(item => item.roomId === roomId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(roomId);
        } else {
            saveCart(cart);
            loadCart();
        }
    }
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (count > 0) {
        $('.cart-count').text(count).show();
    } else {
        $('.cart-count').hide();
    }
    console.log('🛒 Cart count updated:', count);
}

// ===== BOOKING PAGE (jQuery) =====
function loadCart() {
    console.log('🛒 Loading cart page...');

    const cart = getCart();
    const $cartItems = $('#cartItems');
    const $emptyCart = $('#emptyCart');

    if ($cartItems.length === 0) return;

    if (cart.length === 0) {
        $cartItems.hide();
        $emptyCart.show();
        console.log('📭 Cart is empty');
        return;
    }

    console.log('📦 Cart items:', cart.length);

    $cartItems.show();
    $emptyCart.hide();
    $cartItems.empty();

    $.each(cart, function(index, item) {
        $cartItems.append(`
            <div class="cart-item d-flex gap-3">
                <img src="${item.image}" alt="${item.roomName}">
                <div class="flex-grow-1">
                    <h5>${item.roomName}</h5>
                    <p class="text-muted mb-2">${item.hotelName}</p>
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${item.roomId}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="px-3">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.roomId}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="text-end">
                    <div class="fw-bold fs-5 text-primary mb-2">${formatPrice(item.price)}₫</div>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.roomId})">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        `);
    });

    updateCartSummary();
}

function updateCartSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    $('#totalRooms').text(cart.reduce((sum, item) => sum + item.quantity, 0));
    $('#subtotal').text(formatPrice(subtotal) + '₫');
    $('#tax').text(formatPrice(tax) + '₫');
    $('#total').text(formatPrice(total) + '₫');

    console.log('💰 Cart summary - Total:', formatPrice(total) + '₫');
}

// ===== CHECKOUT PAGE (jQuery) - ULTRA FIX VERSION =====
function loadCheckoutSummary() {
    console.log('💳 Loading checkout summary...');

    const cart = getCart();
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails') || 'null');
    const $checkoutSummary = $('#checkoutSummary');

    if ($checkoutSummary.length === 0) {
        console.warn('⚠️ #checkoutSummary element not found');
        return;
    }

    $checkoutSummary.empty();

    let subtotal = 0;
    let tax = 0;
    let total = 0;

    if (cart.length > 0) {
        $.each(cart, function(index, item) {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            $checkoutSummary.append(`
                <div class="d-flex justify-content-between mb-2">
                    <span>${item.roomName} x${item.quantity}</span>
                    <span>${formatPrice(itemTotal)}₫</span>
                </div>
            `);
        });
    } else if (bookingDetails) {
        const date1 = new Date(bookingDetails.checkIn);
        const date2 = new Date(bookingDetails.checkOut);
        const diffTime = date2 - date1;
        const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
        const pricePerNight = bookingDetails.pricePerNight || 0;
        subtotal = pricePerNight * diffDays;
        $checkoutSummary.append(`
            <div class="mb-2"><strong>${bookingDetails.hotelName}</strong></div>
            <div class="d-flex justify-content-between mb-2">
                <span>${formatPrice(pricePerNight)}₫ x ${diffDays} đêm</span>
                <span>${formatPrice(subtotal)}₫</span>
            </div>
        `);
    } else {
        $checkoutSummary.append('<div class="text-muted">Không có thông tin đặt phòng.</div>');
    }

    // Apply active promo if any
    const activePromo = JSON.parse(sessionStorage.getItem('activePromo') || 'null');
    let promoApplied = null;
    let nights = 1;
    try {
        if (bookingDetails) {
            const d1 = new Date(bookingDetails.checkIn);
            const d2 = new Date(bookingDetails.checkOut);
            nights = Math.max(Math.ceil((d2 - d1) / (1000*60*60*24)), 1);
        } else if (cart && cart.length > 0) {
            nights = cart.reduce((s, it) => s + (it.quantity || 1), 0);
        }
    } catch (err) { nights = 1; }

    if (activePromo && activePromo.code && activePromo.discount) {
        const minN = Number(activePromo.minNights || 0);
        if (!minN || nights >= minN) {
            const discountAmount = Math.round(subtotal * Number(activePromo.discount));
            subtotal = Math.max(0, subtotal - discountAmount);
            promoApplied = { code: activePromo.code, amount: discountAmount };
            $checkoutSummary.append(`
                <div class="d-flex justify-content-between mb-2 text-success">
                    <span>Giảm giá (${promoApplied.code})</span>
                    <span>-${formatPrice(promoApplied.amount)}₫</span>
                </div>
            `);
        }
    }

    tax = subtotal * 0.1;
    total = subtotal + tax;

    $('#checkoutSubtotal').text(formatPrice(subtotal) + '₫');
    $('#checkoutTax').text(formatPrice(tax) + '₫');
    $('#checkoutTotal').text(formatPrice(total) + '₫');

    console.log('✅ Checkout summary loaded - Total:', formatPrice(total) + '₫');
}

function setupCheckoutForm() {
    console.log('💳 Setting up checkout form...');

    const $form = $('#checkoutForm');

    if ($form.length === 0) {
        console.warn('⚠️ #checkoutForm element not found');
        return;
    }

    // SỬA KHẨN CẤP 2: Xóa các listener cũ để tránh bind trùng
    $form.off('submit');

    // Prefill customer info if user is logged in
    try {
        const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (currentUser) {
            if (currentUser.name) $('#fullName').val(currentUser.name);
            if (currentUser.email) $('#email').val(currentUser.email);
        }
    } catch (err) {
        console.warn('⚠️ Could not prefill checkout form from user', err);
    }

    // Add new submit handler
    $form.on('submit', function(e) {
        e.preventDefault();
        console.log('💳 Checkout form submitted!');

        const fullName = $('#fullName').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();

        // Clear previous errors
        $('.form-control').removeClass('is-invalid');

        // Validation
        if (!fullName || !email || !phone) {
            showToast('Vui lòng điền đầy đủ thông tin!', 'error');
            if (!fullName) $('#fullName').addClass('is-invalid');
            if (!email) $('#email').addClass('is-invalid');
            if (!phone) $('#phone').addClass('is-invalid');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Email không hợp lệ!', 'error');
            $('#email').addClass('is-invalid');
            return false;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            showToast('Số điện thoại phải có 10 chữ số!', 'error');
            $('#phone').addClass('is-invalid');
            return false;
        }

        // Generate booking code
        const bookingCode = 'BK' + Date.now().toString().slice(-8);
        console.log('✅ Booking code generated:', bookingCode);

        // Lấy dữ liệu bổ sung từ bước chọn phòng/trả phòng nếu có
        const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails') || 'null');
        const cart = getCart();
        const paymentMethodMap = {
            creditCard: 'Thẻ tín dụng/Ghi nợ',
            bankTransfer: 'Chuyển khoản ngân hàng',
            momo: 'Ví MoMo',
            payAtHotel: 'Thanh toán tại khách sạn'
        };
        const selectedPayment = $('input[name="payment"]:checked').attr('id');
        const paymentMethod = paymentMethodMap[selectedPayment] || 'Không xác định';

        // Save booking
        const booking = {
            code: bookingCode,
            fullName: fullName,
            email: email,
            phone: phone,
            notes: $('#notes').val().trim(),
            paymentMethod: paymentMethod,
            cart: cart,
            date: new Date().toISOString(),
            status: 'confirmed',
            checkIn: bookingDetails?.checkIn || '',
            checkOut: bookingDetails?.checkOut || '',
            guests: bookingDetails?.guests || '',
            hotelName: bookingDetails?.hotelName || (cart[0]?.hotelName || '')
        };

        // Attach active promo if present
        try {
            const activePromo = JSON.parse(sessionStorage.getItem('activePromo') || 'null');
            if (activePromo && activePromo.code) booking.promo = activePromo;
        } catch (err) { /* ignore */ }

        // If user booked via quick booking (bookingDetails) and cart is empty,
        // create a synthetic cart item so admin can compute totals correctly.
        if ((!booking.cart || booking.cart.length === 0) && bookingDetails) {
            try {
                const date1 = new Date(bookingDetails.checkIn);
                const date2 = new Date(bookingDetails.checkOut);
                const diffTime = date2 - date1;
                const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
                const pricePerNight = bookingDetails.pricePerNight || 0;
                const syntheticItem = {
                    roomId: bookingDetails.roomId || null,
                    hotelId: bookingDetails.hotelId || null,
                    roomName: bookingDetails.roomName || bookingDetails.roomType || 'Phòng',
                    hotelName: bookingDetails.hotelName || '',
                    price: pricePerNight,
                    image: bookingDetails.image || '',
                    quantity: diffDays
                };
                booking.cart = [syntheticItem];
            } catch (err) {
                console.warn('⚠️ Failed to build synthetic cart item from bookingDetails', err);
            }
        }

        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        console.log('💾 Booking saved to localStorage');

        // Remove temporary booking details so chúng không ảnh hưởng lần đặt tiếp theo
        sessionStorage.removeItem('bookingDetails');
        // Remove active promo after saving booking
        try { sessionStorage.removeItem('activePromo'); } catch(e){}

        // Clear cart
        localStorage.removeItem('cart');
        updateCartCount();
        console.log('🗑️ Cart cleared');

        // Clear favorites after successful booking
        try {
            localStorage.removeItem('favorites');
            renderFavoritesList();
            if (typeof markFavoriteButtons === 'function') markFavoriteButtons();
            console.log('🧾 Favorites cleared after booking');
        } catch (err) {
            console.warn('⚠️ Failed to clear favorites after booking', err);
        }

        // Show success modal
        $('#bookingCode').text(bookingCode);

        // Use Bootstrap 5 modal API
        const modalElement = document.getElementById('successModal');
        if (modalElement) {
            console.log('✅ Showing success modal...');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            console.warn('⚠️ Success modal not found, using alert');
            alert('Đặt phòng thành công! Mã đơn hàng: ' + bookingCode);
            window.location.href = 'index.html';
        }

        return false;
    });

    console.log('✅ Checkout form setup complete');
}

// ===== LOGIN/REGISTER (jQuery) - ULTRA FIX VERSION =====
function setupAuthForms() {
    console.log('🔐 Setting up authentication forms...');

    // Login form
    const $loginForm = $('#loginFormSubmit');
    if ($loginForm.length > 0) {
        $loginForm.off('submit');
        $loginForm.on('submit', function(e) {
            e.preventDefault();
            console.log('🔐 Login form submitted');

            const email = $('#loginEmail').val().trim();
            const password = $('#loginPassword').val().trim();

            if (email && password) {
                // Try to find registered user to get name
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const matched = users.find(u => u.email === email);
                const name = matched ? matched.name : email;
                localStorage.setItem('user', JSON.stringify({ email: email, name: name }));
                showToast('Đăng nhập thành công!', 'success');
                showUserInNav();
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 800);
            }
        });
        console.log('✅ Login form ready');
    }

    // Register form
    const $registerForm = $('#registerFormSubmit');
    if ($registerForm.length > 0) {
        $registerForm.off('submit');
        $registerForm.on('submit', function(e) {
            e.preventDefault();
            console.log('📝 Register form submitted');

            const name = $('#regName').val();
            const email = $('#regEmail').val();
            const phone = $('#regPhone').val();
            const password = $('#regPassword').val();
            const confirmPassword = $('#regConfirmPassword').val();

            if (password.length < 6) {
                showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showToast('Mật khẩu xác nhận không khớp!', 'error');
                $('#regConfirmPassword').addClass('is-invalid');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({
                name,
                email,
                phone,
                password,
                createdAt: new Date().toISOString(),
                status: 'active'
            });
            localStorage.setItem('users', JSON.stringify(users));

            showToast('Đăng ký thành công!', 'success');
            setTimeout(function() {
                toggleAuthForm('login');
            }, 1500);
        });
        console.log('✅ Register form ready');
    }

    // Admin login form
    const $adminForm = $('#adminLoginFormSubmit');
    if ($adminForm.length > 0) {
        $adminForm.off('submit');
        $adminForm.on('submit', function(e) {
            e.preventDefault();
            console.log('👑 Admin login form submitted');

            const username = $('#adminUsername').val();
            const password = $('#adminPassword').val();

            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('adminUser', JSON.stringify({ username: username }));
                showToast('Đăng nhập Admin thành công!', 'success');
                setTimeout(function() {
                    window.location.href = 'admin.html';
                }, 1500);
            } else {
                showToast('Sai tên đăng nhập hoặc mật khẩu!', 'error');
            }
        });
        console.log('✅ Admin login form ready');
    }

    // Nếu đã đăng nhập admin, tự động điều hướng về admin.html
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || 'null');
    if (adminUser && window.location.pathname.includes('login.html')) {
        console.log('👑 Admin đã đăng nhập, chuyển hướng về admin.html');
        window.location.href = 'admin.html';
        return;
    }
}

// Show logged-in user in navbar
function showUserInNav() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
        $('#loginLink').addClass('d-none');
        $('#userLink').removeClass('d-none');
        $('#logoutBtn').removeClass('d-none');
        $('#userName').text(user.name || user.email || 'Người dùng');
    } else {
        $('#loginLink').removeClass('d-none');
        $('#userLink').addClass('d-none');
        $('#logoutBtn').addClass('d-none');
        $('#userName').text('');
    }
}

// Logout handler
function logoutUser() {
    localStorage.removeItem('user');
    showToast('Đã đăng xuất', 'success');
    showUserInNav();
    setTimeout(function() { window.location.href = 'index.html'; }, 500);
}

$(document).on('click', '#logoutBtn', function(e) {
    e.preventDefault();
    logoutUser();
});

function toggleAuthForm(formType) {
    console.log('🔄 Toggling to form:', formType);

    $('#loginForm').toggle(formType === 'login');
    $('#registerForm').toggle(formType === 'register');
    $('#adminLoginForm').hide();
}

function showAdminLogin() {
    console.log('👑 Showing admin login form');

    $('#loginForm, #registerForm').hide();
    $('#adminLoginForm').show();
}

function togglePassword(inputId) {
    const $input = $('#' + inputId);
    const type = $input.attr('type') === 'password' ? 'text' : 'password';
    $input.attr('type', type);
}

// ===== UTILITIES (jQuery) =====
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showToast(message, type = 'info') {
    console.log('🔔 Toast:', type, '-', message);

    let $container = $('.toast-container');
    if ($container.length === 0) {
        $container = $('<div class="toast-container"></div>');
        $('body').append($container);
    }

    const bgColors = {
        success: 'bg-success',
        error: 'bg-danger',
        warning: 'bg-warning',
        info: 'bg-info'
    };

    const $toast = $(`
        <div class="toast align-items-center text-white ${bgColors[type]} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `);

    $container.append($toast);
    const toast = new bootstrap.Toast($toast[0], { delay: 3000 });
    toast.show();

    $toast.on('hidden.bs.toast', function() {
        $(this).remove();
    });
}

// Hiển thị các alias dùng bởi handler inline trong HTML
// `currentSlide` is referenced by HTML dots; point it to `goToSlide`
if (typeof window !== 'undefined') {
    window.currentSlide = window.currentSlide || function(i) { try { goToSlide(i); } catch(e){} };
    window.changeSlide = window.changeSlide || function(dir) { try { changeSlide(dir); } catch(e){} };
}

// Expose a compact API object to make the file easier to use from HTML/other scripts
;(function exposeAPI() {
    var api = {
        bookNow: typeof bookNow === 'function' ? bookNow : null,
        addToCart: typeof addToCart === 'function' ? addToCart : null,
        toggleFavorite: typeof toggleFavorite === 'function' ? toggleFavorite : null,
        favoriteCheckout: typeof favoriteCheckout === 'function' ? favoriteCheckout : null,
        removeFavorite: typeof removeFavorite === 'function' ? removeFavorite : null,
        updateQuantity: typeof updateQuantity === 'function' ? updateQuantity : null,
        removeFromCart: typeof removeFromCart === 'function' ? removeFromCart : null,
        showToast: typeof showToast === 'function' ? showToast : null,
        formatPrice: typeof formatPrice === 'function' ? formatPrice : null,
        updateCartCount: typeof updateCartCount === 'function' ? updateCartCount : null,
        renderFavoritesList: typeof renderFavoritesList === 'function' ? renderFavoritesList : null,
        markFavoriteButtons: typeof markFavoriteButtons === 'function' ? markFavoriteButtons : null,
        setupPromotions: typeof setupPromotions === 'function' ? setupPromotions : null,
        loadHotels: typeof loadHotels === 'function' ? loadHotels : null,
        loadHotelDetail: typeof loadHotelDetail === 'function' ? loadHotelDetail : null,
        loadCheckoutSummary: typeof loadCheckoutSummary === 'function' ? loadCheckoutSummary : null
    };
    // attach both namespace and individual globals for compatibility with existing inline handlers
    window.LuxApp = window.LuxApp || {};
    Object.assign(window.LuxApp, api);
    Object.keys(api).forEach(function(k) { if (api[k]) window[k] = window[k] || api[k]; });
})();

function toggleFavorite(hotelId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const idx = favorites.findIndex(f => f.hotelId === hotelId);
    if (idx !== -1) {
        // remove
        favorites.splice(idx, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showToast('Đã xóa khỏi yêu thích', 'success');
    } else {
        // add
        const hotel = hotelsData.find(h => h.id === hotelId);
        const room = roomsData.find(r => r.hotelId === hotelId) || null;
        const fav = {
            hotelId: hotelId,
            hotelName: hotel ? hotel.name : 'Khách sạn',
            roomId: room ? room.id : null,
            roomName: room ? room.name : 'Phòng',
            price: room ? room.price : (hotel ? hotel.price : 0),
            image: hotel ? hotel.image : ''
        };
        favorites.push(fav);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showToast('Đã thêm vào yêu thích!', 'success');
    }
    renderFavoritesList();
    markFavoriteButtons();
}

function markFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    $('.favorite-btn').each(function() {
        const hid = parseInt($(this).attr('data-hotelid'));
        const icon = $(this).find('i');
        if (favorites.find(f => f.hotelId === hid)) {
            icon.removeClass('far').addClass('fas');
            icon.css('color', '#ef4444');
        } else {
            icon.removeClass('fas').addClass('far');
            icon.css('color', '');
        }
    });
    if (favorites.length > 0) {
        $('.favorites-count').text(favorites.length).show();
    } else {
        $('.favorites-count').hide();
    }
}

function renderFavoritesList() {
    const $list = $('#favoritesList');
    if ($list.length === 0) return;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    $list.empty();
    if (favorites.length === 0) {
        $list.append('<div class="text-center text-muted">Chưa có yêu thích nào</div>');
        return;
    }
    favorites.forEach(function(f, idx) {
        const item = $(
            `<div class="list-group-item d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img src="${f.image}" style="width:72px;height:56px;object-fit:cover;border-radius:8px;margin-right:12px;" />
                    <div>
                        <div class="fw-bold">${f.hotelName}</div>
                        <div class="text-muted small">${f.roomName} — ${formatPrice(f.price)}₫</div>
                    </div>
                </div>
                <div class="btn-group-vertical">
                    <button class="btn btn-sm btn-outline-danger mb-1" onclick="removeFavorite(${f.hotelId})">Xóa</button>
                    <button class="btn btn-sm btn-primary" onclick="favoriteCheckout(${f.hotelId})">Thanh toán</button>
                </div>
            </div>`
        );
        $list.append(item);
    });
}

function removeFavorite(hotelId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updated = favorites.filter(f => f.hotelId !== hotelId);
    localStorage.setItem('favorites', JSON.stringify(updated));
    renderFavoritesList();
    markFavoriteButtons();
    showToast('Đã xóa khỏi yêu thích', 'success');
}

function favoriteCheckout(hotelId) {
    // Build cart from favorite (use the room if present)
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const fav = favorites.find(f => f.hotelId === hotelId);
    if (!fav) return;
    const cartItem = {
        roomId: fav.roomId,
        hotelId: fav.hotelId,
        roomName: fav.roomName,
        hotelName: fav.hotelName,
        price: fav.price,
        image: fav.image,
        quantity: 1
    };
    localStorage.setItem('cart', JSON.stringify([cartItem]));
    updateCartCount();
    window.location.href = 'checkout.html';
}

function setupScrollToTop() {
    const $scrollBtn = $('#scrollTopBtn');
    if ($scrollBtn.length === 0) return;

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $scrollBtn.addClass('show');
        } else {
            $scrollBtn.removeClass('show');
        }
    });

    $scrollBtn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
}

function setupSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
}

// ===== HÀM HỖ TRỢ DEBUG =====
// Chạy trong Console: testHotels() để test function loadHotels()
function testHotels() {
    console.log('🧪 Testing loadHotels()...');
    loadHotels();
}

// Chạy trong Console: checkSetup() để kiểm tra setup
function checkSetup() {
    console.log('='.repeat(60));
    console.log('🔍 SYSTEM CHECK');
    console.log('='.repeat(60));
    console.log('jQuery loaded:', typeof jQuery !== 'undefined');
    console.log('Bootstrap loaded:', typeof bootstrap !== 'undefined');
    console.log('Hotels data:', hotelsData.length, 'hotels');
    console.log('Rooms data:', roomsData.length, 'rooms');
    console.log('#hotelsList exists:', $('#hotelsList').length > 0);
    console.log('#hotelsList children:', $('#hotelsList').children().length);
    console.log('Cart items:', getCart().length);
    console.log('='.repeat(60));
}
