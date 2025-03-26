import PropTypes from "prop-types"; // Импортируем PropTypes

const Shield = ({ size = 40, className = "", imageHref = "" }) => {
    const svgSize = `${size}px`;
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize}><image href={imageHref}/></svg>
    );
};

// Добавляем валидацию пропсов
Shield.propTypes = {
    size: PropTypes.number, // size должен быть числом
    className: PropTypes.string, // className должен быть строкой
};

export default Shield;