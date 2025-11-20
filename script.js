// Small helper: because this file is single-file, we generate items dynamically in template above.
// But when served as plain HTML the template literal will not run. To make the file runnable as-is
// we will detect if the gallery is empty (no children) and fill with placeholders programmatically.

(function () {
  const gallery = document.getElementById("gallery");
  // if (!gallery) return;
  // if (gallery.children.length === 0) {
  //   for (let i = 1; i <= 15; i++) {
  //     const item = document.createElement("div");
  //     item.className = "item";
  //     const btn = document.createElement("button");
  //     btn.className = "frame";
  //     btn.setAttribute("aria-pressed", "false");
  //     btn.setAttribute("data-index", i);
  //     btn.tabIndex = 0;
  //     const img = document.createElement("img");
  //     img.src = `https://picsum.photos/seed/20${i}/600/450`;
  //     img.alt = `Ảnh kỷ niệm ${i}`;
  //     btn.appendChild(img);
  //     item.appendChild(btn);
  //     gallery.appendChild(item);
  //   }
  // }

  // click/keyboard handling
  gallery.addEventListener("click", (e) => {
    const f = e.target.closest(".frame");
    if (!f) return;
    f.classList.toggle("revealed");
    const pressed = f.classList.contains("revealed");
    f.setAttribute("aria-pressed", pressed);
    // small scale animation
    if (pressed) {
      f.style.transform = "translateY(-8px) scale(1.02)";
    } else {
      f.style.transform = "";
    }
  });

  gallery.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const f = e.target.closest(".frame");
      if (!f) return;
      e.preventDefault();
      f.click();
    }
  });

  // Khai báo các nút
  const toggleViewBtn = document.getElementById("toggleViewBtn");
  const toggleAlbumBtn = document.getElementById("toggleAlbumBtn");

  // Biến trạng thái
  let isAllRevealed = false;
  let isAlbumOpen = true;

  // 2. Logic nút: Hiện tất cả / Ẩn lại
  toggleViewBtn.addEventListener("click", () => {
    isAllRevealed = !isAllRevealed;
    const spanText = toggleViewBtn.querySelector(".nut");
    const icon = toggleViewBtn.querySelector("img"); // Lấy ảnh trong nút này
    const allFrames = document.querySelectorAll(".frame");

    if (isAllRevealed) {
      // Chế độ: HIỆN HẾT (mắt đang mở -> chuyển sang icon mắt nhắm để bấm vào thì ẩn)
      allFrames.forEach((f) => {
        f.classList.add("revealed");
        f.setAttribute("aria-pressed", "true");
      });
      spanText.textContent = "Ẩn lại";
      // SỬA: Thêm dòng này để đổi icon
      icon.src = "IMG/eye.png";
    } else {
      // Chế độ: ẨN HẾT (mắt đang nhắm -> chuyển sang icon mắt mở)
      allFrames.forEach((f) => {
        f.classList.remove("revealed");
        f.setAttribute("aria-pressed", "false");
        f.style.transform = "";
      });
      spanText.textContent = "Hiện tất cả";
      icon.src = "IMG/close.png";
    }
  });

  // 3. Logic nút: Đóng / Mở Album
  toggleAlbumBtn.addEventListener("click", () => {
    isAlbumOpen = !isAlbumOpen;
    const spanText = toggleAlbumBtn.querySelector(".nut");
    // SỬA: Phải khai báo biến icon ở đây thì nút này mới hiểu
    const icon = toggleAlbumBtn.querySelector("img");

    if (isAlbumOpen) {
      // MỞ Album -> Hiển thị icon nút Đóng (ví dụ dấu X)
      gallery.style.display = "grid";
      spanText.textContent = "Đóng Album";
      toggleViewBtn.style.display = "inline-flex"; // Hiện lại nút chỉnh ảnh

      icon.src = "IMG/closeabl.png"; // Đổi thành icon đóng (dấu X)
    } else {
      // ĐÓNG Album -> Hiển thị icon nút Mở (ví dụ quyển album)
      gallery.style.display = "none";
      spanText.textContent = "Mở Album";
      toggleViewBtn.style.display = "none"; // Ẩn nút chỉnh ảnh đi

      icon.src = "IMG/album.png"; // Hoặc "IMG/album.png" nếu bạn có icon quyển album
    }
  });
})();
