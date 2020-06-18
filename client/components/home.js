import React from 'react'
import {
  CarouselProvider,
  Image,
  Slide,
  Slider,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Dot
} from 'pure-react-carousel'
import {Divider, Container, Button, Icon, Header} from 'semantic-ui-react'
import 'pure-react-carousel/dist/react-carousel.es.css'

export const Homepage = () => {
  return (
    <div>
      <Container textAlign="center" fluid id="homepage-banner">
        <Header as="h1" id="page-title-home">
          Polish'd
        </Header>
        <Button primary size="huge">
          View Our Collection
          <Icon name="right arrow" />
        </Button>
      </Container>
      <CarouselProvider
        naturalSlideWidth={3}
        naturalSlideHeight={1}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}>
            <Image src="http://placekitten.com/600/200" />
          </Slide>
          <Slide index={1}>
            <Image src="http://placekitten.com/600/200" />
          </Slide>
          <Slide index={2}>
            <Image src="http://placekitten.com/600/200" />
          </Slide>
        </Slider>
        <Divider />
        <Container textAlign="center">
          <Button.Group>
            <Button as={Dot} icon="circle" slide={0} />
            <Button as={Dot} icon="circle" slide={1} />
            <Button as={Dot} icon="circle" slide={2} />
          </Button.Group>
        </Container>
      </CarouselProvider>
    </div>
  )
}
