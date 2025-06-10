// import { getDictionary, Locale } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Link from "next/link";

export default async function () {
  return (
    <div className="bg-[#F6F4FF]">
      <div
        className="banner bg-[url('/images/bg-seller.png')] bg-no-repeat"
        style={{ backgroundSize: "100% 100%" }}
      >
        <div className="mx-[5vw] lg:mx-[10vw] pt-[30px] lg:pt-[20px] pb-[65px] lg:pb-[35px]">
          <div className="flex flex-row flex-wrap lg:flex-nowrap">
            <div className="banner-title w-full lg:w-6/12 flex items-center justify-start lg:justify-center text-[#52307D] font-bold text-[32px] sm:text-[42px] md:text-[56px] leading-tight md:leading-none">
              Gói thành viên <br /> người bán
            </div>
            <div className="banner-pic flex justify-center w-full lg:w-6/12">
              <Image
                src={"/images/person-seller.png"}
                alt={"person-seller"}
                width={606}
                height={534}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="content pt-[45px] lg:pt-[68px] pb-[65px] lg:pb-[95px]">
        <div className="mx-[5vw] lg:mx-[8vw]">
          <div className="content_wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-[25px]">
            <div className="content_wrap-item rounded-[40px] bg-[#ffffff] overflow-hidden relative pb-[100px] lg:pb-[125px]">
              <div
                className="title text-[#FFFFFF] font-bold text-[18px] py-[20px] px-[20px] rounded-t-[40px] text-center uppercase"
                style={{
                  background:
                    "linear-gradient(180deg, #A77AE1 0%, #52307D 100%)",
                }}
              >
                Thành viên chính thức
              </div>
              <ul className="information">
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Truy cập và xem các danh mục người mua
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Đăng sản phẩm trong danh mục nhà sản xuất. Giới hạn 2 sản phẩm
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Nhắn tin tới người mua/ ngày. Giới hạn
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Xem thông tin liên hệ của người mua hàng. Giới hạn
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Nhận tin nhắn từ người mua. Không
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Dịch vụ ủy thác xuất khẩu - Vận chuyển và đảm bảo an toàn
                  trong thanh toán với người mua
                </li>
              </ul>
              <div className="position_btn txt-free">
                <span className="text-[22px] text-[#FF8900] leading-none font-bold text-center uppercase">
                  Free
                </span>
              </div>
            </div>
            <div className="content_wrap-item rounded-[40px] bg-[#ffffff] overflow-hidden relative pb-[100px] lg:pb-[125px]">
              <div
                className="title text-[#FFFFFF] font-bold text-[18px] py-[20px] px-[30px] rounded-t-[40px] text-center uppercase"
                style={{
                  background:
                    "linear-gradient(180deg, #BEBEBE 0%, #868686 100%)",
                }}
              >
                Thành viên bạc
              </div>
              <ul className="information">
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Truy cập và xem các danh mục người mua
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Đăng sản phẩm trong danh mục nhà sản xuất - 15 sản phẩm
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Nhắn tin tới người mua/ ngày. 3 người mua/ ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Xem thông tin liên hệ của người mua hàng. 3 người mua/ ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Nhận tin nhắn từ người mua. Có
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Tag thành viên bạc tăng uy tín bán hàng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Dịch vụ ủy thác xuất khẩu - Vận chuyển và đảm bảo an toàn
                  trong thanh toán với người mua
                </li>
              </ul>
              <div className="package text-center mt-[60px] lg:mt-[118px]">
                <p className="package-item text-[15px] text-[#52307D] uppercase">
                  100k/ tháng
                </p>
                <p className="package-item text-[15px] text-[#52307D] uppercase">
                  200k/ 3 tháng
                </p>
                <p className="package-item text-[22px] text-[#FF8900] uppercase font-bold">
                  360k/ năm
                </p>
              </div>
              <div className="position_btn">
                <Link
                  href="#"
                  className="hover:opacity-70 btn-free inline-block w-[166px] text-[22px] text-[#FFFFFF] leading-none bg-[#868686] font-bold text-center uppercase rounded-[50px] py-[12px] px-[25px]"
                >
                  Đăng Ký
                </Link>
              </div>
            </div>
            <div className="content_wrap-item rounded-[40px] bg-[#ffffff] overflow-hidden relative pb-[100px] lg:pb-[125px]">
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
                  Truy cập và xem các danh mục người mua
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Đăng sản phẩm trong danh mục nhà sản xuất - 50 sản phẩm
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Nhắn tin tới người mua/ ngày. 20 người mua/ ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Xem thông tin liên hệ của người mua hàng. 20 người mua/ ngày
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Nhận tin nhắn từ người mua. Có
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Tag thành viên vàng tăng uy tín bán hàng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Dịch vụ ủy thác xuất khẩu - Vận chuyển và đảm bảo an toàn
                  trong thanh toán với người mua
                </li>
              </ul>
              <div className="package text-center mt-[60px] lg:mt-[118px]">
                <p className="package-item text-[15px] text-[#52307D] uppercase">
                  200k/ tháng
                </p>
                <p className="package-item text-[15px] text-[#52307D] uppercase">
                  400k/ tháng
                </p>
                <p className="package-item text-[22px] text-[#FF8900] uppercase font-bold">
                  720k/ tháng
                </p>
              </div>
              <div className="position_btn">
                <Link
                  href="#"
                  className="hover:opacity-70 btn-free inline-block w-[166px] text-[22px] text-[#52307D] leading-none bg-[#FF8900] font-bold text-center uppercase rounded-[50px] py-[12px] px-[25px]"
                >
                  Đăng Ký
                </Link>
              </div>
            </div>
            <div className="content_wrap-item rounded-[40px] bg-[#ffffff] overflow-hidden relative pb-[100px] lg:pb-[125px]">
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
                  Tất cả các quyền của thành viên vàng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Đại diện bán hàng quốc tế ( dành cho các nhà sản xuất, hợp tác
                  xã chưa có nhân viên kinh doanh quốc tế )
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Hiển thị trong danh mục nhà sản xuất uy tín đã được xác minh
                  trực tiếp theo ngành hàng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Báo cáo tổng hợp người mua theo tuần (lọc riêng ra những người
                  mua uy tín và nghiêm túc)
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] font-bold border-b border-solid border-b-[#EBE0F9]">
                  Sản phẩm đăng bán được quảng bá tại các vị trí tốt trong trang
                  chủ và ngành hàng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] font-bold border-b border-solid border-b-[#EBE0F9]">
                  Tag thành viên VIP tăng uy tín bán hàng
                </li>
                <li className="information_item text-[15px] text-[#52307D] bg-[#ffffff] py-[20px] pl-[40px] pr-[15px] border-b border-solid border-b-[#EBE0F9]">
                  Dịch vụ ủy thác xuất khẩu - Vận chuyển và đảm bảo an toàn
                  trong thanh toán với người mua
                </li>
              </ul>
              <div className="position_btn">
                <Link
                  href="#"
                  className="hover:opacity-70 btn-free inline-block w-[166px] text-[22px] text-[#52307D] leading-none font-bold text-center uppercase rounded-[50px] py-[12px] px-[25px]  bg-[url('/images/bg-btn.png')] bg-no-repeat bg-cover"
                >
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
