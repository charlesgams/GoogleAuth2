import Layout from "../components/Layout";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../utils/auth";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Text,
  Spacer,
  Input,
} from "@nextui-org/react";

export default function Mail() {
  const user = useContext(UserContext),
    [tasksLists, setTasksLists] = useState([]);

  const headers = new Headers({
    "content-Type": "application/json",
  });

  const apiCall = async () => {
    if (!user.user) return;
    console.log(user.user);

    const res = await fetch("http://localhost:5001/getTasks", {
      headers,
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        token: user.user.token,
      }),
    })
      .then((res) => res.json())
      .then((res) => res);

    setTasksLists(res);
  };

  const submitTask = async (taskListId, form) => {
    const title = form.querySelector('input[name="title"]'),
      notes = form.querySelector('input[name="notes"]');

    const response = await fetch("http://localhost:5001/addTask", {
      method: "POST",
      mode: "cors",
      headers,
      body: JSON.stringify({
        token: user.user.token,
        taskListId,
        title: title.value,
        notes: notes.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);

    await apiCall();
  };

  const deleteTask = async (listId, taskId) => {
    console.log(listId, taskId);
    const response = await fetch("http://localhost:5001/task", {
      method: "DELETE",
      mode: "cors",
      headers,
      body: JSON.stringify({
        token: user.user.token,
        listId,
        taskId,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);

    await apiCall();
  };

  useEffect(() => {
    apiCall();
  }, [user]);

  return (
    <Layout>
      <Spacer y={4} />
      <Container>
        <Row gap={5}>
          {tasksLists.length > 0 &&
            tasksLists.map((task) => {
              return (
                <Col span={3}>
                  <Card>
                    <Card.Body>
                      <h2>{task.listName}</h2>
                      <Col justify="center">
                        <form
                          onSubmit={(e) => {
                            submitTask(task.listId, e.target);
                            e.preventDefault();
                          }}
                        >
                          <Col>
                            <Input name="title" placeholder="Task title" />
                            <Input name="notes" placeholder="Task notes" />
                            <Input type="submit" status="primary" />
                          </Col>
                        </form>
                        <Spacer y={6} />
                      </Col>
                      {task.items.map((item) => {
                        return (
                          <Row align="center">
                            <Spacer y={4} />
                            <Col>
                              <Text>{item.title}</Text>
                              <Text small b>
                                {item.notes}
                              </Text>
                            </Col>
                            <Button
                              onClick={(e) => {
                                deleteTask(task.listId, item.id);
                                e.preventDefault();
                              }}
                            >
                              Delete
                            </Button>
                          </Row>
                        );
                      })}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </Layout>
  );
}
