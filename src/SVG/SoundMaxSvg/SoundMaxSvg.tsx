interface SoundMaxSvgProps {
    volume:number
}


const SoundMaxSvg = ({volume}:SoundMaxSvgProps) => {
    return (
        <svg 
            width="30px"
            height="30px"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier"  strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g clipPath="url(#clip0_15_174)">
                    <rect width="24" height="24"  ></rect>
                    <path 
                        d="M3 16V8H6L11 4V20L6 16H3Z" 
                        stroke="#C8C7BE" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                    />
                    <path 
                        d="M13 9C13 9 15 9.5 15 12C15 14.5 13 15 13 15" 
                        stroke="#C8C7BE" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                    />
                    {
                        ( volume * 100 >= 35 ) &&
                        <path 
                        d="M15 7C15 7 18 7.83333 18 12C18 16.1667 15 17 15 17" 
                        stroke="#C8C7BE" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                    />
                    }
                   
                    {
                        ( volume * 100 >= 70 ) &&
                        <path 
                        d="M17 5C17 5 21 6.16667 21 12C21 17.8333 17 19 17 19" 
                        stroke="#C8C7BE" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                    />
                    }
                   
                </g>
                
            </g>
        </svg>
    );
};

export default SoundMaxSvg;
