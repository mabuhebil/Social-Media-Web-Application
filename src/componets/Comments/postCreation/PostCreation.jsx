import { Avatar, Card, CardBody } from "@heroui/react";
import React from "react";
import { Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
export default function PostCreation() {
  return (
    <>
      <section className="pt-12 ">
        <div className="w-full max-w-100 md:max-w-1/2 mx-auto space-y-4">
          <Card>
            <CardBody className="flex flex-row items-center gap-5">
              <Avatar
                alt="John Doe"
                src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
              />
              <div>
                <p>what is in your mind mohamed</p>
              </div>
            </CardBody>
          </Card>

          <Modal>
            <Button variant="secondary" className="text-9xl bg-amber-700">
              Open Modal
            </Button>
            <Modal.Backdrop>
              <Modal.Container>
                <Modal.Dialog className="sm:max-w-[360px]">
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-default text-foreground">
                      <Rocket className="size-5" />
                    </Modal.Icon>
                    <Modal.Heading>Welcome to HeroUI</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      A beautiful, fast, and modern React UI library for
                      building accessible and customizable web applications with
                      ease.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="w-full" slot="close">
                      Continue
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </div>
      </section>
    </>
  );
}
