'use client'

interface BrushedProps {
    children: React.ReactNode;
    brush : '0' | '1' | '2' | '3' | '4' | '5';
}

const Brushed: React.FC<BrushedProps> = ({children, brush}) => {
    const backgroundImage = `/images/brush-stroke-banner-${brush}.png`;
    return (
        <div className={`relative p-4 bg-no-repeat bg-center bg-[length:100%_100%] overflow-visible`} style={{ backgroundImage: `url(${backgroundImage})`}}>
            {children}
        </div>
    )
}

export default Brushed
