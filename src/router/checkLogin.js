// import { createToaster } from "@meforma/vue-toaster";

// const toastr = createToaster({
//     position: "top-right",
// });

// export default function(to, from, next) {
//     // Kiểm tra xem có session ID trong sessionStorage không
//     const sessionId = sessionStorage.getItem('session-id');

//     if (sessionId) {
//         // Nếu có session ID, cho phép truy cập tiếp theo
//         next();
//     } else {
//         // Nếu không có session ID, chuyển hướng đến trang đăng nhập và hiển thị thông báo
//         toastr.warning("Thông báo<br> Bạn chưa đăng nhập!");
//         next("/login");
//     }
// }
import { useToast } from 'vue3-toastify';
// import { ref } from 'vue';


export default function(to, from, next) {
    //to là đối tượng Route mà bạn đang cố gắng điều hướng đến.
    //from là đối tượng Route hiện tại.
    //next là một hàm được gọi để tiếp tục điều hướng
    const toast = useToast();
    const sessionId = localStorage.getItem('session-id');
    console.log(sessionId);
    if (sessionId) {
        next("/TodoApp");
    } else {
        toast.warning("Bạn chưa đăng nhập!");
        next("/login");
    }
}

// export default function useAuthMiddleware() {
//     const toast = useToast();
//     const isAuthenticated = ref(false);

//     const checkAuth = () => {
//         const sessionId = sessionStorage.getItem('session-id');
//         isAuthenticated.value = !!sessionId;
//         return isAuthenticated.value;
//     };

//     const redirectToLogin = () => {
//         toast.warning("Bạn chưa đăng nhập!");
//         return "/login";
//     };

//     const redirectToTodoApp = () => {
//         toast.success("Bạn đăng nhập thành công!");
//         return "/TodoApp";
//     };

//     return {
//         isAuthenticated,
//         checkAuth,
//         redirectToLogin,
//         redirectToTodoApp
//     };
// }


