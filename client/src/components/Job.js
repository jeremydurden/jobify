import moment from "moment";

const Job = ({ company, createdAt }) => {
  const date = moment(createdAt).format("MMM Do, YYYY");
  return (
    <div>
      <h5>{company}</h5>
      <h5>{date}</h5>
    </div>
  );
};
export default Job;
