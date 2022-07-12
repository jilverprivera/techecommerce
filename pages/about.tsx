import Layout from '../layout';

const About = () => {
  return (
    <Layout title="About -  TechEcommerce">
      <section className="max-w-screen-xl mx-auto flex items-start justify-center flex-col">
        <h1 className="text-3xl font-supremeBold">About</h1>

        <p>TechEcommerce is a side project </p>

        <div className="flex">
          <p className="mr-1">
            If you want to check the Backend files, follow:
          </p>
          <a
            href="https://github.com/jilverprivera/RESTful-API"
            className="font-supremeBold">
            Github RESTful API
          </a>
        </div>
        <div className="flex">
          <p className="mr-1">
            If you want to check the Frontend files, follow:
          </p>
          <a
            href="https://github.com/jilverprivera/RESTful-API"
            className="font-supremeBold">
            Github RESTful API
          </a>
        </div>

        <span>
          <strong>Disclaimer: </strong>
          TechEcommerce have a real payment checkout with Paypal, DONT'T PAY!
        </span>
      </section>
    </Layout>
  );
};

export default About;
