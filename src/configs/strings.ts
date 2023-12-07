import { useSelector } from "react-redux";
import { RootState } from "~/redux/reducers";

export const API_URL = 'https://us-central1-travelwithqr.cloudfunctions.net/app';
export const IMGUR_API = 'https://api.imgur.com/3/image';
export const IMGUR_ACCESSTOKEN = 'bd5bbd951883ea8';

const { lang } = useSelector((state: RootState) => state.global);
let vi: boolean = lang === 'vi'

const AppString = {
  Common: {
    ComingSoon: vi ? 'Chức năng đang được phát triển!' : 'Comming Soon!',
    SelectDefault: vi ? 'Chọn' : 'Select',
    ConfirmTitle: vi ? 'Xác Nhận Thao Tác' : 'Confirm Action',
    ConfirmText: vi ? 'Bạn có chắc muốn thực hiện thao tác này ?' : 'Are you sure you want to perform this action ?',
    ConfirmAccept: vi ? 'Đồng Ý' : 'Confirm',
    ConfirmCancel: vi ? 'Bỏ Qua' : 'Cancel',
    LoadingAlert: vi ? 'Vui lòng đợi giây lát...' : 'Loading, please wait...'
  },
  Login: {
    LoginAlert1: vi ? 'Tên đăng nhập hoặc mật khẩu bị sai' : 'Incorrect username or password',
    Username: vi ? 'Nhập tên đăng nhập' : 'Enter your username',
    Password: vi ? 'Nhập mật khẩu' : 'Enter your password',
    Register: vi ? 'Đăng ký' : 'Register',
    NoAccount: vi ? 'Chưa có tài khoản? Vui lòng ' : 'Don\'t have account? Please '
  },
  Register: {
    AccessLibraryFailed: vi ? 'Vui lòng cấp quyền truy cập thư viện!!' : 'Please allow app to access your library!',
    UploadFailed: vi ? 'Không thể tải ảnh lên host. status ' : 'Cannot upload image to server. Status ',
    UserExists: vi ? 'Username này đã tồn tại' : 'Username already exists!',
    RegisterInfo: vi ? 'Thông tin đăng ký' : 'Register information',
    Fullname: vi ? 'Họ tên' : 'Fullname',
    Phone: vi ? 'SĐT' : 'Phone',
    Address: vi ? 'Địa chỉ' : 'Address',
    FillAlert: vi ? 'Vui lòng không bỏ trống thông tin!' : 'Please fill out the form!',
    FullnameInput: vi ? 'Nhập họ tên' : 'Enter your Name',
    PhoneInput: vi ? 'Nhập số điện thoại' : 'Enter your Mobile phone',
    AddressInput: vi ? 'Nhập địa chỉ' : 'Enter your Address',
    RegisterButton: vi ? 'Đăng ký tài khoản' : 'Register Account' 
  },
  Dashboard: {
    Welcome: vi ? 'Xin chào, ' : 'Welcome, ',
    Foryou: vi ? 'Dành cho bạn' : 'Recommened for you',
    Explore: vi ? 'Khám phá các địa điểm' : 'Explore Places',
    Summary: vi ? 'Tổng quan' : 'Summary',
    Userstatistic: vi ? 'Thống kê người dùng' : 'User Statistic',
    BarChartLabel1: vi ? 'Địa điểm' : 'Places',
    BarChartLabel2: vi ? 'Điểm tham quan' : 'Attractions',
    BarChartLabel3: vi ? 'Người dùng' : 'Users',
    PieChartLabel1: vi ? 'Người dùng' : 'Users',
    PieChartLabel2: vi ? 'Quản trị viên' : 'Administrators'
  }
};
export default AppString;
