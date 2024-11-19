import Header from "../../components/JobListing/Header";
import Breadcrumb from "../../components/JobListing/BreadCrumb";
import JobDescription from "../../components/JobListing/JobDescription";
import JobHeader from "../../components/JobListing/JobHeader";
import Responsibilities from "../../components/JobListing/Responsibilites";
import ShareJob from "../../components/JobListing/ShareJob";

const JobListing = () => {
  const jobDetails = {
    title: "Senior UX Designer",
    company: "Instagram",
    website: "https://instagram.com",
    phone: "(406) 555-0120",
    email: "career@instagram.com",
    expiryDate: "June 30, 2021",
    description:
      "Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.",
    responsibilities: [
      "Quisque semper gravida est et consectetur.",
      "Curabitur blandit lorem velit, vitae pretium leo placerat eget.",
      "Morbi mattis in ipsum ac tempus.",
      "Curabitur eu vehicula libero. Vestibulum sed purus ullamcorper, lobortis lectus nec.",
      "vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.",
      "lobortis vel lectus. Nulla at risus ut diam.",
      "commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.",
      "odio metus posuere lorem, id condimentum erat velit nec neque.",
      "dui sodales ut. Curabitur tempus augue.",
    ],
  };

  return (
    <div className='bg-[#fbfaf4] min-h-screen'>
      <Header />
      <Breadcrumb />
      <JobHeader {...jobDetails} />
      <JobDescription description={jobDetails.description} />
      <Responsibilities responsibilities={jobDetails.responsibilities} />
      <ShareJob />
    </div>
  );
};

export default JobListing;
