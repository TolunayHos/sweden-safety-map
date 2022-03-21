const About = () => {
  return (
    <div>
      <p>
        This is an interactive map marking all criminal incidents that are
        reported to the police in all over Sweden as of January 2022. The map is
        updated with new incidents everyday at 7 pm. <br></br>
        <br></br>
        <span className="exclamation">
          <i className="exclamation triangle icon  "></i>
          Please do note that marker locations do not precisely show where the
          incident took place. Polisen tends to report incidents on a single gps
          coordinate on each municipal area for every incident occured in that
          municipal area. The reason why you see them scattered despite the same
          reported coordinates is because I make ∼0.10% change on reported
          latitude and longitude towards different directions to prevent
          overlapping on the map. This is also the reason why markers are prone
          to cluster in a narrow circle.
        </span>
        <br></br>
        <br></br>
        <span className="overflowSmall">
          The primary purpose of this application is to help non-local people
          assess the safety of the neighbourhoods bofore purchasing a house &
          moving in. It can also be used to obtain information about the common
          crime types in the selected neighbourhoods so as one knows what to be
          wary of.
        </span>
        <br></br>
        <br></br>
        It is founded, developed and being maintained by Tolunay Hos, an
        entreprenuer aspiring to be a front-end developer. Should you have
        questions or ideas for improvement, please do connect and contact me
        from <a href="https://www.linkedin.com/in/tolunay-hos/"> here </a>. If
        you seek a junior front-end developer in your organization, learn more
        about me from <a href="https://www.tolunay.dev/"> here. </a>
        <br></br>
        <br></br>
        For more technical information, please have a look at{" "}
        <a href="https://github.com/TolunayHos/sweden-safety-map">
          Frontend source code
        </a>{" "}
        and{" "}
        <a href="https://github.com/TolunayHos/sweden-safety-backend">
          Backend source code
        </a>
        .<br></br>
        <br></br>
        <span className="overflowBig">
          The application is in constant development process and new features
          will be implemented in accordance with the wishes of the users.
        </span>
      </p>
    </div>
  );
};

export default About;
