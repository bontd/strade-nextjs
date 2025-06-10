// import { getDictionary, Locale } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Link from "next/link";

export default async function () {
  return (
    <div className="bg-[#F6F4FF]">
      <div
        className="banner bg-[url('/images/bg-buyer.png')] bg-no-repeat"
        style={{ backgroundSize: "100% 100%" }}
      >
        <div className="mx-[5vw] lg:mx-[10vw] pt-[30px] lg:pt-[20px] pb-[65px] lg:pb-[35px]">
          <div className="flex flex-row flex-wrap lg:flex-nowrap">
            <div className="banner-title w-full lg:w-6/12 flex items-center justify-start lg:justify-center text-[#52307D] -bold text-[32px] sm:text-[42px] md:text-[56px] leading-tight md:leading-none">
              Gói thành viên <br /> người mua
            </div>
            <div className="banner-pic flex justify-center w-full lg:w-6/12">
              <Image
                src={"/images/person-buyer.png"}
                alt={"person-buyer"}
                width={450}
                height={568}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="content pt-[45px] lg:pt-[68px] pb-[65px] lg:pb-[95px]">
        <div className="mx-[5vw] lg:mx-[8vw] 2xl:mx-[15vw]">
          <div className="content_wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-[25px]">
            <div className="content_wrap-item rounded-[40px] bg-[#ffffff] overflow-hidden relative pb-[120px]">
              <div
                className="title text-[#FFFFFF] font-bold text-[18px] py-[20px] px-[30px] rounded-t-[40px] text-center uppercase"
                style={{
                  background:
                    "linear-gradient(180deg, #A77AE1 0%, #52307D 100%)",
                }}
              >
                Thành viên chính thức
              </div>
              <ul className="information">
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Truy cập và xem các danh mục người mua / nhà sản xuất
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Đăng 5 yêu cầu mua hàng/ tháng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Nhắn tin tới 1 nhà cung cấp/ ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Xem thông tin của 1 nhà cung cấp / ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Vận chuyển và đảm bảo an toàn trong thanh toán với nhà sản
                  xuất tại VietNam
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px]">
                  Hỗ trợ khiếu nại tới các cơ quan pháp luật tại VietNam khi có
                  gian lận từ Nhà sản xuất
                </li>
              </ul>
              <div className="position_btn">
                <Link
                  href="#"
                  className="hover:opacity-70 inline-block w-[211px] btn-free text-[22px] text-[#FF8900] leading-none bg-[#52307D] font-bold text-center uppercase rounded-[50px] py-[21px] px-[25px]"
                >
                  Free
                </Link>
              </div>
            </div>
            <div className="content_wrap-item rounded-[40px] bg-[#ffffff] overflow-hidden relative pb-[120px]">
              <div
                className="title text-[#FFFFFF] font-bold text-[18px] py-[20px] px-[30px] rounded-t-[40px] text-center uppercase"
                style={{
                  background:
                    "linear-gradient(180deg, #FFC974 0%, #FF8900 100%)",
                }}
              >
                Thành viên vàng
              </div>
              <ul className="information">
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Truy cập và xem các danh mục người mua / nhà sản xuất
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Đăng 30 yêu cầu mua hàng/ tháng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Nhắn tin tới 10 nhà cung cấp / ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Xem thông tin của 10 nhà cung cấp / ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Yêu cầu mua hàng được ưu tiên hiển thị TOP đầu trong 7 ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Yêu cầu mua hàng được gắn tag thành viên Vàng tăng độ uy tín
                  với nhà cung cấp
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Kiểm tra năng lực nhà sản xuất 3 / tháng ( nền tảng trực tiếp
                  kiểm tra các thông tin nhà sản xuất online và gửi bản báo cáo)
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Truy cập box thông tin nhà bán hàng đã xác thực trực tiếp các
                  ngành hàng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px]">
                  Hỗ trợ khiếu nại tới các cơ quan pháp luật tại VietNam khi có
                  gian lận từ Nhà sản xuất
                </li>
              </ul>
              <div className="position_btn">
                <Link
                  href="#"
                  className="hover:opacity-70 inline-block w-[211px] btn-free text-[22px] text-[#52307D] leading-none bg-[#FF9B21] font-bold text-center uppercase rounded-[50px] py-[10px] px-[25px]"
                >
                  12 USD/ năm <br />{" "}
                  <span className="text-[15px] font-normal">
                    ( 1 USD/ tháng )
                  </span>
                </Link>
              </div>
            </div>
            <div className="content_wrap-item rounded-[40px] bg-[#ffffff] overflow-hidden relative pb-[120px]">
              <div
                className="title text-[#EAAC0D] font-bold text-[18px] py-[20px] px-[30px] rounded-t-[40px] text-center uppercase"
                style={{
                  background:
                    "linear-gradient(180deg, #4B484F 0%, #000000 100%)",
                }}
              >
                Thành viên VIP
              </div>
              <ul className="information">
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Sở hữu 1 đại diện mua hàng nhiều kinh nghiệm làm việc cho bạn
                  tại VietNam
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Được nền tảng trực tiếp tìm kiếm, thẩm định năng lực và kết
                  nối tới nhà sản xuất tốt nhất tại VietNam
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Yêu cầu xác minh năng lực thực tế tại nhà máy sản xuất có địa
                  chỉ tại VietNam
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] font-bold border-b border-solid border-b-[#EBE0F9]">
                  Nhắn tin tới 30 nhà cung cấp / ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] font-bold border-b border-solid border-b-[#EBE0F9]">
                  Xem thông tin của 30 nhà cung cấp / ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Yêu cầu mua hàng được gắn tag thành viên VIP - độ uy tín cao
                  nhất
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Yêu cầu mua hàng được{" "}
                  <span className="font-bold"> hiển thị TOP đầu</span> trong
                  danh mục và trên trang chủ danh mục
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Truy cập box thông tin nhà bán hàng đã xác thực trực tiếp các
                  ngành hàng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Vận chuyển và đảm bảo an toàn trong thanh toán với nhà sản
                  xuất tại VietNam
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px]">
                  Hỗ trợ khiếu nại tới các cơ quan pháp luật tại VietNam khi có
                  gian lận từ Nhà sản xuất
                </li>
              </ul>
              <div className="position_btn">
                <Link
                  href="#"
                  className="hover:opacity-70 inline-block w-[211px] btn-free text-[22px] text-[#52307D] leading-none font-bold text-center uppercase rounded-[50px] py-[21px] px-[25px]  bg-[url('/images/bg-btn.png')] bg-no-repeat bg-cover"
                >
                  liên hệ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
