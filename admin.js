// ===== KIỂM TRA QUYỀN ADMIN (jQuery) =====
$(document).ready(function() {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser && window.location.pathname.includes('admin.html')) {
        window.location.href = 'login.html';
        return;
    }
    loadAdminData();
    setupAdminEvents();
});

// ===== KHỞI TẠO SỰ KIỆN (jQuery) =====
function setupAdminEvents() {
    $('.sidebar-nav .nav-link').on('click', function(e) {
        e.preventDefault();
        const sectionId = $(this).attr('href').substring(1);
        if (sectionId) {
            showAdminSection(sectionId);
        }
    });
}

// ===== ĐIỀU HƯỚNG TRONG ADMIN (jQuery) =====
function showAdminSection(sectionId) {
    $('.admin-section').hide();
    $('.sidebar-nav .nav-link').removeClass('active');
    $('#' + sectionId).fadeIn(300);
    const titles = {
        dashboard: 'Dashboard',
        hotels: 'Quản lý Khách sạn',
        rooms: 'Quản lý Phòng',
        bookings: 'Đơn đặt phòng',
        users: 'Người dùng'
    };
    $('#pageTitle').text(titles[sectionId] || 'Dashboard');
    $(`.sidebar-nav a[href="#${sectionId}"]`).addClass('active');
}

// ===== TẢI DỮ LIỆU CHO BẢNG QUẢN TRỊ (jQuery) =====
function loadAdminData() {
    loadHotelsTable();
    loadRoomsTable();
    loadBookingsTable();
    loadUsersTable();
    loadDashboardRecentBookings();
    updateDashboardStats();
}

// Hiển thị các đơn đặt phòng gần đây trên dashboard
function loadDashboardRecentBookings() {
    const $tbody = $('#dashboardRecentBookingsBody');
    if ($tbody.length === 0) return;
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    $tbody.empty();
    const recent = bookings.slice().reverse().slice(0, 5);
    if (recent.length === 0) {
        $tbody.append('<tr><td colspan="6" class="text-center">Chưa có đơn đặt phòng nào</td></tr>');
        return;
    }
    recent.forEach(function(b) {
        const totalBefore = (b.cart || []).reduce((sum, it) => sum + (it.price * (it.quantity || 1)), 0);
        let total = totalBefore;
        if (b.promo && b.promo.discount) {
            const d = Math.round(totalBefore * Number(b.promo.discount));
            total = Math.max(0, totalBefore - d);
        }
        $tbody.append(`
            <tr>
                <td>${b.code}</td>
                <td>${b.fullName}</td>
                <td>${b.hotelName || (b.cart[0]?.hotelName || '-')}</td>
                <td>${b.date ? new Date(b.date).toLocaleDateString('vi-VN') : '-'}</td>
                <td>${formatPrice(total)}₫</td>
                <td><span class="badge ${b.status === 'confirmed' ? 'bg-success' : b.status === 'cancelled' ? 'bg-danger' : 'bg-warning'}">${b.status === 'confirmed' ? 'Đã xác nhận' : b.status === 'cancelled' ? 'Đã hủy' : 'Chờ'}</span></td>
            </tr>
        `);
    });
}

function updateDashboardStats() {
    const hotels = typeof hotelsData !== 'undefined' ? hotelsData.length : 0;
    const rooms = typeof roomsData !== 'undefined' ? roomsData.length : 0;
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    $('#statHotels').text(hotels);
    $('#statRooms').text(rooms);
    $('#statBookings').text(bookings.length);
    $('#statUsers').text(users.length);
}

// Lắng nghe thay đổi LocalStorage từ tab khác (ví dụ có đơn mới)
window.addEventListener('storage', function(e) {
    if (!e.key) return;
    if (e.key === 'bookings' || e.key === 'users' || e.key === 'cart' || e.key === 'hotelsData' || e.key === 'roomsData') {
        // Cập nhật lại các phần liên quan trong giao diện admin
        loadBookingsTable();
        loadUsersTable();
        loadHotelsTable();
        loadRoomsTable();
        loadDashboardRecentBookings();
        updateDashboardStats();
    }
});

// Dự phòng polling: định kỳ làm mới danh sách đặt phòng nếu event storage bị bỏ lỡ
setInterval(function() {
    try {
        loadBookingsTable();
        loadDashboardRecentBookings();
        updateDashboardStats();
    } catch (err) {
        console.warn('Admin polling error:', err);
    }
}, 5000);

// ===== QUẢN LÝ KHÁCH SẠN (jQuery) =====
function loadHotelsTable() {
    const $tbody = $('#hotelsTableBody');
    if ($tbody.length === 0) return;
    const hotels = typeof hotelsData !== 'undefined' ? hotelsData : [];
    $tbody.empty();
    $.each(hotels, function(index, hotel) {
        const stars = Array(hotel.stars).fill('⭐').join('');
        $tbody.append(`
            <tr>
                <td>${hotel.id}</td>
                <td>${hotel.name}</td>
                <td>${hotel.address}</td>
                <td>${stars}</td>
                <td>${formatPrice(hotel.price)}₫</td>
                <td><span class="badge bg-success">Hoạt động</span></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="editHotel(${hotel.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteHotel(${hotel.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

function showAddHotelModal() {
    alert('Chức năng thêm khách sạn sẽ mở modal form ở đây');
}

function editHotel(id) {
    alert('Chỉnh sửa khách sạn ID: ' + id);
}

function deleteHotel(id) {
    if (confirm('Bạn có chắc muốn xóa khách sạn này?')) {
        showToast('Đã xóa khách sạn ID: ' + id, 'success');
    }
}

// ===== QUẢN LÝ PHÒNG (jQuery) =====
function loadRoomsTable() {
    const $tbody = $('#roomsTableBody');
    if ($tbody.length === 0) return;
    const rooms = typeof roomsData !== 'undefined' ? roomsData : [];
    const hotels = typeof hotelsData !== 'undefined' ? hotelsData : [];
    $tbody.empty();
    $.each(rooms, function(index, room) {
        const hotel = hotels.find(h => h.id === room.hotelId);
        $tbody.append(`
            <tr>
                <td>${room.id}</td>
                <td>${room.name}</td>
                <td>${hotel ? hotel.name : 'N/A'}</td>
                <td><span class="badge bg-info">${room.type}</span></td>
                <td>${formatPrice(room.price)}₫</td>
                <td>${room.maxGuests} người</td>
                <td><span class="badge bg-success">Trống</span></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="editRoom(${room.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRoom(${room.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

function showAddRoomModal() {
    alert('Chức năng thêm phòng sẽ mở modal form ở đây');
}

function editRoom(id) {
    alert('Chỉnh sửa phòng ID: ' + id);
}

function deleteRoom(id) {
    if (confirm('Bạn có chắc muốn xóa phòng này?')) {
        showToast('Đã xóa phòng ID: ' + id, 'success');
    }
}

// ===== QUẢN LÝ ĐƠN ĐẶT (jQuery) =====
function loadBookingsTable() {
    const $tbody = $('#bookingsTableBody');
    if ($tbody.length === 0) return;
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    $tbody.empty();
    if (bookings.length === 0) {
        $tbody.append('<tr><td colspan="9" class="text-center">Chưa có đơn đặt phòng nào</td></tr>');
        return;
    }
    $.each(bookings, function(index, booking) {
        const hotelName = booking.hotelName || (booking.cart[0]?.hotelName || 'N/A');
        const roomNames = booking.cart.map(item => item.roomName).join(', ');
        const checkIn = booking.checkIn || '-';
        const checkOut = booking.checkOut || '-';
        const totalBefore = booking.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let totalPrice = totalBefore;
        let promoNote = '';
        if (booking.promo && booking.promo.discount) {
            const discount = Math.round(totalBefore * Number(booking.promo.discount));
            totalPrice = Math.max(0, totalBefore - discount);
            promoNote = ` <small class="text-success">(-${formatPrice(discount)}₫ ${booking.promo.code})</small>`;
        }
        const statusClass = booking.status === 'confirmed' ? 'bg-success' : booking.status === 'cancelled' ? 'bg-danger' : 'bg-warning';

        $tbody.append(`
            <tr>
                <td>${booking.code}</td>
                <td>${booking.fullName}</td>
                <td>${hotelName}</td>
                <td>${roomNames}</td>
                <td>${checkIn}</td>
                <td>${checkOut}</td>
                <td>${formatPrice(totalPrice)}₫${promoNote}</td>
                <td><span class="badge ${statusClass}">${booking.status === 'confirmed' ? 'Đã xác nhận' : booking.status === 'cancelled' ? 'Đã hủy' : 'Chờ'}</span></td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="viewBooking('${booking.code}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${booking.status !== 'cancelled' ? `<button class="btn btn-sm btn-warning me-1" onclick="updateBookingStatus('${booking.code}','cancelled')"><i class="fas fa-times"></i></button>` : `<button class="btn btn-sm btn-success me-1" onclick="updateBookingStatus('${booking.code}','confirmed')"><i class="fas fa-check"></i></button>`}
                    <button class="btn btn-sm btn-danger" onclick="deleteBooking('${booking.code}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

function viewBooking(code) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const booking = bookings.find(b => b.code === code);
    if (booking) {
        const rooms = booking.cart.map(item => `${item.roomName} (${item.quantity})`).join('\n');
        const details = `Mã đơn: ${booking.code}\nKhách hàng: ${booking.fullName}\nEmail: ${booking.email}\nSĐT: ${booking.phone}\nKhách sạn: ${booking.hotelName}\nPhòng: ${rooms}\nNhận phòng: ${booking.checkIn || '-'}\nTrả phòng: ${booking.checkOut || '-'}\nSố khách: ${booking.guests || '-'}\nTổng: ${formatPrice(booking.cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}₫\nTrạng thái: ${booking.status}\nPhương thức: ${booking.paymentMethod || '-'}\nGhi chú: ${booking.notes || '-'}\nNgày tạo: ${new Date(booking.date).toLocaleString('vi-VN')}`;
        alert(details);
    }
}

function updateBookingStatus(code, status) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const booking = bookings.find(b => b.code === code);
    if (!booking) return;
    booking.status = status;
    localStorage.setItem('bookings', JSON.stringify(bookings));
    showToast(`Đã cập nhật trạng thái đơn ${code} thành ${status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}`, 'success');
    loadBookingsTable();
}

function deleteBooking(code) {
    if (!confirm('Bạn có chắc muốn xóa đơn đặt phòng này?')) return;
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = bookings.filter(b => b.code !== code);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    showToast('Đã xóa đơn đặt phòng', 'success');
    loadBookingsTable();
}

// ===== QUẢN LÝ NGƯỜI DÙNG (jQuery) =====
function loadUsersTable() {
    const $tbody = $('#usersTableBody');
    if ($tbody.length === 0) return;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    $tbody.empty();
    if (users.length === 0) {
        $tbody.append('<tr><td colspan="7" class="text-center">Chưa có người dùng nào</td></tr>');
        return;
    }
    $.each(users, function(index, user) {
        const createdAt = user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN');
        const statusBadge = user.status === 'active' ? 'bg-success' : 'bg-secondary';

        $tbody.append(`
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${createdAt}</td>
                <td><span class="badge ${statusBadge}">${user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}</span></td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="viewUser(${index})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

function viewUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users[index]) {
        alert('Thông tin người dùng: ' + JSON.stringify(users[index], null, 2));
    }
}

function deleteUser(index) {
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsersTable();
        showToast('Đã xóa người dùng', 'success');
    }
}

// ===== HÀM TIỆN ÍCH (jQuery) =====
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showToast(message, type = 'info') {
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

function logoutAdmin() {
    localStorage.removeItem('adminUser');
    window.location.href = 'login.html';
}

// ===== BỘ LỌC TÌM KIẾM TRONG ADMIN (jQuery) =====
$('#searchHotels').on('input', function() {
    const keyword = $(this).val().toLowerCase();
    $('#hotelsTableBody tr').each(function() {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(keyword));
    });
});

$('#filterLocation').on('change', function() {
    const location = $(this).val();
    console.log('Filter by location:', location);
});
