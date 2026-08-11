import Header from "./_components/Header";
import CreatetaskForm from "./_components/create-task-form";
import ShowTask from "./_components/show-task";

export default async function Dashboard() {
  return (
    <>
      <Header />
      <CreatetaskForm />
      <ShowTask />
    </>
  );
}
