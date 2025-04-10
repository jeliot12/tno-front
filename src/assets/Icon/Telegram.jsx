import PropTypes from "prop-types"; // Импортируем PropTypes

const Telegram = ({ size = 25, className = "" }) => {
    const svgSize = `${size}px`;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize}> <image  x="0px" y="0px" width={svgSize} height={svgSize}  href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACi1BMVEX///8lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod4lod8mo+EnpeQnpuYnpucnpeUmpOMlot8mpOInpuUop+cpqOkkpugco+cZouchpecopuYmouAmp+ggpOcYoeYoqOhdve6K0PNMtuwjpOYpp+cjpecaoeYdouY/sOqIzvLU7fv4/P7///+m2/YbouUlouAnp+Ynp+cipeYXoeUmpudfve2s3fbx+f6c1/QboOQop+YkpeYcoeUZoeUyq+h7yfDM6vn7/f+Ay/AboeQmo+ImpeQlpeUaoOQdouRItOmV1PPk9Pzo9vyq3PX3/P5mwO0coeMnpOMmpeUho+QZn+Mio+Rdu+uy3/bv+f274vZBseiU0/L9/v/6/f9NteoeoeMYn+IwqeV1xu77/f7x+f18yO+Z1fPl9Pw4rOYgouIlo+AipOMyquWQ0fHc8PrF5/g/r+cUnOHL6fkopeQio+IcoOFcu+r6/f70+v6GzO8Zn+G44fax3vUdoOIko+IlpOJEseaCy+694/bg8vvq9vy64vZMtOgOmt8qpuPD5veT0fEYnuElo+Edn+EWneAgoeE4q+RBruYjouIvp+PC5fdxw+0XneAiouEdoOAcn+AhoeE+reTr9vxRtucZnt8louEfn+BOtObL6ffm9fs2quMdoN8Xnd4mo+CP0O/1+/7Q6/gioOAiod8goN8Vm91UtubP6vis3PMWnN0kot8oo9+W0u/0+v35/f5lvegYnN0kod4dnt1IsORYt+YioN4joN4kod0cntwandxMFKozAAAAH3RSTlMABlam3/nz11VR21IDiVTj5Ftcq6zg+PLZB4qTlFP6t2bvfgAAAAFiS0dEAIgFHUgAAAAHdElNRQfpBAoWLjEl0HCaAAAB9ElEQVQ4y2NgAAFGJmYWVnlUwMbOzMHIAAecXPLYARc3VAUPrzxuwMsDVoNPCVARSAmfPH7AB3QuPwE1AowMgvKEgBCDMEE1IgyimIIKikrKKsqqalCuKIMYugp1DU0tbR1dPX0DqAArA5oRhmrKWkbGJqZm5haWMEEUNYYaSgZW1ja2dvYOjk7OLljUuKopu7l7eHp5+/g6AYGfvwKaGqAlqgGBQcEhoWHhTmAQEYmqRj0qWtUgJjYuPiERKJuUnAIkU9NQ1Kina2ZkZmXn5OaBDMgvKCxyciouKUVxj6JSZll5RVglSEVVdVoNiK6tq0dR09DY1NwCcUVrW3symNHR2YWixrC7pxcs0dc/oXsiRPGkyVNQ1KhPnTJt+oyZs2bPmTtvPkSJ04KFGqjh07Bo8ZKly5avWLJyFVSJ0+o1i9DCUN1w0dp16zes27gJqqRv8xZDjHBWb9i6qKFh2/YdEDU7d+12xRIX6q5AsGfvvv0gNQcOHlLAokZeAajG8PCRo8eAao6fcEWoEUeO+JMnT6qfPHLq9Jmz586rwwRZGSTQktiFCxcunr90+crVCzARUSzp+cK1a9dvXEPwRYjKF4TzlyQDAwcBNRygzCyFV4kUpNyQxqNEhgdausjiLH/4EIUUo6AIixyavByLiCCkHAMA8XTojtRWMgAAAAAASUVORK5CYII=" /></svg>
    );
};

// Добавляем валидацию пропсов
Telegram.propTypes = {
    size: PropTypes.number, // size должен быть числом
    className: PropTypes.string, // className должен быть строкой
};

export default Telegram;