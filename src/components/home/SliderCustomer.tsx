'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

function Feedback({img, content, user, title}: { img: string, content: string, user: string, title: string }) {
    return (
      <div className="w-full relative sm:h-96 xl:h-64">
        <Image src={img} alt={''} width={108} height={108} className="rounded-full absolute left-[50%] lg:left-0 top-[-50px] lg:top-[50%] translate-x-[-50%] lg:translate-x-[0] lg:translate-y-[-50%] my-auto" />
        <div className="border-[1px] border-[#EBE0F9] bg-[#ffffff] rounded-xl mt-14 lg:mt-0 lg:ml-14 h-full pt-16 pb-4 lg:py-8 px-4 lg:pl-16 lg:pr-8 flex flex-col justify-between">
          <p className="text-[#767676] text-sm sm:text-base">{content}</p>
          <div className="xl:flex justify-between mt-4">
            <p>
                <span className="uppercase text-primary block text-base font-semibold">{user}</span>
                <span className="text-gray text-sm">{title}</span>
            </p>
            <div className="flex gap-1 mt-2">
              <Image src={'/images/yellow-star.svg'} alt='' width={18} height={18} />
              <Image src={'/images/yellow-star.svg'} alt='' width={18} height={18} />
              <Image src={'/images/yellow-star.svg'} alt='' width={18} height={18} />
              <Image src={'/images/yellow-star.svg'} alt='' width={18} height={18} />
              <Image src={'/images/yellow-star.svg'} alt='' width={18} height={18} />
            </div>
          </div>
        </div>
      </div>
    )
}

export default function SliderCustomer() {

    const NextArrow = (props : any) => {
        return (
            <button className="absolute w-[25px] top-[45%] left-[100%]" onClick={props.onClick}>
                <Image src={'/images/rightCircle.svg'} alt={''} width={25} height={25}/>
            </button>
        )
    }

    const PrevArrow = (props : any) => {
        return (
            <button className="absolute w-[25px] top-[45%] right-[100%]" onClick={props.onClick}>
                <Image src={'/images/leftCircle.svg'} alt={''} width={25} height={25}/>
            </button>
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1
              }
            },
        ]
    };

    return (
        <div className="slider-customer">
            <Slider {...settings}>
                <div>
                    <Feedback img={'/images/customers/mr.nguyen_manh_ha.png'}
                    content="Dịch vụ Strade rất chuyên nghiệp và hiệu quả. Nhờ vào sự tư vấn tận tình và kiến thức chuyên môn sâu rộng của đội ngũ, chúng tôi đã có thể mở rộng thị trường và tăng cường doanh số bán hàng đáng kể trong thời gian ngắn."
                              user='Ông Nguyễn Mạnh Hà' title='Giám đốc Công ty TNHH TMDV Hà Kim Phát'/>
                </div>
                <div>
                    <Feedback img={'/images/customers/mr.le_duy_khoi.png'}
                            content={"Strade luôn phản hồi nhanh chóng và giải quyết các vấn đề một cách chuyên nghiệp. Sự đáng tin cậy của họ đã giúp chúng tôi cảm thấy an tâm trong quá trình kinh doanh quốc tế."}
                            user=' Ông Lê Duy Khơi' title='Phó giám đốc Công ty TNHH Cơ khí Quyết Tiến'/>
                </div>
                <div>
                    <Feedback img={'/images/customers/mr.nguyen_dinh_thuc.png'}
                    content="Chúng tôi rất hài lòng với sự hiểu biết sâu rộng về thị trường địa phương mà Strade cung cấp. Strade đã giúp chúng tôi định hình chiến lược kinh doanh một cách thông minh và hiệu quả."
                    user='Ông Nguyễn Đình Thức' title='Giám đốc Công ty Cổ phần Tư vấn và Xây dựng Hưng Hà'/>
                </div>
            </Slider>
        </div>
    )
}
