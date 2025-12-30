# 📱 Responsive Design Documentation

## Tổng quan

Dự án sử dụng **Mobile-First Approach** với các breakpoints chuẩn để đảm bảo trải nghiệm tốt trên mọi thiết bị.

---

## 🎯 Breakpoints

```scss
$breakpoint-sm: 640px;   // Điện thoại lớn / Tablet nhỏ
$breakpoint-md: 768px;   // Tablet
$breakpoint-lg: 1024px;  // Desktop nhỏ
$breakpoint-xl: 1280px;  // Desktop lớn
```

### Phân loại thiết bị

| Loại | Kích thước | Breakpoint |
|------|-----------|------------|
| 📱 Mobile | < 640px | Mặc định |
| 📱 Mobile lớn | 640px - 767px | sm |
| 📱 Tablet | 768px - 1023px | md |
| 💻 Desktop | 1024px - 1279px | lg |
| 🖥️ Desktop lớn | ≥ 1280px | xl |

---

## 🛠️ Mixins Responsive

### 1. **Responsive cơ bản** (Mobile-first)

```scss
@include responsive(sm) {
    // Áp dụng cho màn hình ≥ 640px
}

@include responsive(md) {
    // Áp dụng cho màn hình ≥ 768px
}

@include responsive(lg) {
    // Áp dụng cho màn hình ≥ 1024px
}

@include responsive(xl) {
    // Áp dụng cho màn hình ≥ 1280px
}
```

### 2. **Mobile-only**

```scss
@include mobile-only {
    // Chỉ áp dụng cho màn hình < 640px
}
```

### 3. **Tablet-down**

```scss
@include tablet-down {
    // Áp dụng cho màn hình < 768px
}
```

### 4. **Tablet-only**

```scss
@include tablet-only {
    // Chỉ áp dụng cho màn hình 640px - 767px
}
```

### 5. **Desktop-up**

```scss
@include desktop-up {
    // Áp dụng cho màn hình ≥ 1024px
}
```

### 6. **Responsive Font Size**

```scss
@include responsive-font(0.875rem, 1rem, 1.125rem);
// mobile: 0.875rem, tablet: 1rem, desktop: 1.125rem
```

### 7. **Responsive Spacing**

```scss
@include responsive-spacing(padding, $spacing-sm, $spacing-md, $spacing-lg);
```

---

## 📐 Component Responsive Patterns

### **Navbar**

```scss
// Mobile: Compact design
// - Logo nhỏ hơn (32px)
// - Hide text logo
// - Nav links chỉ hiện icon
// - Title text nhỏ và truncate

// Tablet & Desktop:
// - Logo đầy đủ với text
// - Nav links hiện text và icon
// - Spacing tăng dần
```

**Breakpoints:**
- `< 640px`: Mobile compact
- `≥ 640px`: Hiện logo text
- `≥ 768px`: Spacing chuẩn
- `≥ 1024px`: Full desktop layout

### **Filter Component**

```scss
// Mobile: Full width, không sticky
// Tablet: Full width, không sticky
// Desktop: Sticky sidebar 300px
```

**Breakpoints:**
- `< 1024px`: Full width, relative position
- `≥ 1024px`: Sticky sidebar 300px

### **BxhKyNang (Main Content)**

```scss
// Mobile: Full width (100%)
// Desktop: 70% width với filter sidebar
```

**Breakpoints:**
- `< 1024px`: width: 100%
- `≥ 1024px`: width: 70%

### **Stats Grid**

```scss
// Mobile: 2 columns
// Desktop: 4 columns
```

**Layout:**
```scss
grid-template-columns: repeat(2, 1fr);  // Mobile

@media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);  // Desktop
}
```

### **BxhList Table**

**Desktop (≥ 1024px):**
```scss
grid-template-columns: 80px 80px 1fr 150px 150px 150px;
// Rank | Branch | Name | Count | Time | Level
```

**Tablet (640px - 1023px):**
```scss
grid-template-columns: 55px 70px 1fr 100px 110px;
// Rank | Branch | Name | Count | Level (hide Time on smaller tablets)
```

**Mobile (< 640px):**
```scss
grid-template-columns: 45px 1fr;
grid-template-areas:
    "rank name"
    "rank branch"
    "stats stats";
// Stacked layout với grid areas
```

---

## 🎨 Utility Classes

### Display

```scss
.show-mobile      // Hiện trên mobile, ẩn trên tablet+
.show-tablet      // Chỉ hiện trên tablet
.show-desktop     // Chỉ hiện trên desktop

.hide-mobile      // Ẩn trên mobile
.hide-tablet      // Ẩn trên tablet
.hide-desktop     // Ẩn trên desktop
```

### Container

```scss
.container        // Container responsive với max-width
.container-fluid  // Full width với responsive padding
```

### Spacing

```scss
.p-responsive     // Padding responsive
.px-responsive    // Padding horizontal responsive
.py-responsive    // Padding vertical responsive
```

### Text

```scss
.text-responsive-sm    // 0.75rem → 0.875rem → 1rem
.text-responsive-base  // 0.875rem → 1rem → 1.125rem
.text-responsive-lg    // 1rem → 1.25rem → 1.5rem
.text-responsive-xl    // 1.25rem → 1.5rem → 2rem → 2.5rem
```

### Layout

```scss
.flex-column-mobile    // Column trên mobile, row trên desktop
.flex-row-mobile       // Row trên mobile, column trên desktop
.grid-responsive       // 1 col → 2 cols → 3 cols → 4 cols
```

### Scroll

```scss
.scroll-x-mobile       // Horizontal scroll trên mobile với custom scrollbar
```

---

## 📱 Mobile UX Best Practices

### 1. **Touch Targets**

Tất cả các element tương tác có min-height và min-width **44px** trên mobile:

```scss
@media (hover: none) and (pointer: coarse) {
    button, a, input[type="checkbox"] {
        min-height: 44px;
        min-width: 44px;
    }
}
```

### 2. **Font Sizes**

- **Mobile minimum:** 0.75rem (12px)
- **Body text:** 0.875rem - 1rem (14px - 16px)
- **Headings:** Scale từ 1.5rem đến 3rem

### 3. **Spacing**

- **Mobile:** Spacing nhỏ hơn để tối ưu không gian
- **Tablet+:** Tăng dần spacing theo breakpoints

### 4. **Layout**

- **Mobile:** Single column, stacked layout
- **Tablet:** 2 columns
- **Desktop:** Multi-column với sidebar

### 5. **Performance**

```scss
// Smooth scrolling
html {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
}

// Hardware acceleration
.animated-element {
    transform: translateZ(0);
    will-change: transform;
}
```

---

## 🧪 Testing Checklist

### Devices cần test:

- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] Samsung Galaxy S20 (360px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1280px, 1440px, 1920px)

### Features cần kiểm tra:

- [ ] Touch targets đủ lớn (≥ 44px)
- [ ] Text dễ đọc (không quá nhỏ)
- [ ] Images scale đúng cách
- [ ] Navigation dễ sử dụng
- [ ] Tables/Lists hiển thị tốt
- [ ] Forms dễ nhập liệu
- [ ] Không có horizontal scroll không mong muốn
- [ ] Performance tốt trên mobile

---

## 🔧 Debug Tips

### 1. **Chrome DevTools**

```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
```

### 2. **Responsive Design Mode (Firefox)**

```
Ctrl+Shift+M
```

### 3. **CSS để debug breakpoints**

```scss
body::before {
    content: 'Mobile';
    position: fixed;
    top: 0;
    left: 0;
    padding: 4px 8px;
    background: red;
    color: white;
    z-index: 9999;

    @include responsive(sm) { content: 'Tablet Small'; background: orange; }
    @include responsive(md) { content: 'Tablet'; background: yellow; }
    @include responsive(lg) { content: 'Desktop'; background: green; }
    @include responsive(xl) { content: 'Desktop XL'; background: blue; }
}
```

---

## 📚 References

- [CSS Tricks - Complete Guide to Responsive Web Design](https://css-tricks.com/responsive-web-design/)
- [MDN - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google Web Fundamentals - Responsive Web Design Basics](https://developers.google.com/web/fundamentals/design-and-ux/responsive)

---

**Cập nhật:** 28/11/2025  
**Version:** 2.0  
**Developer:** Senior Frontend Team
