import {
  Button,
  Card,
  DisplayText,
  Grid,
  Icon,
  MediaCard,
  Stack,
  TextStyle,
  Thumbnail,
  VideoThumbnail
} from "@shopify/polaris"
import { ResourcePicker } from "@shopify/app-bridge-react"
import { useState, useCallback, Fragment } from "react"
import { SearchMinor, FilterMajor, ImageMajor } from "@shopify/polaris-icons"

export default function SelectCollections() {
  const [showResourcePicker, setShowResourcePicker] = useState(false)
  const [selectedCollections, setSelectedCollections] = useState([])

  const handleCollectionChange = useCallback(({ selection }) => {
    console.log(selection)
    setSelectedCollections(selection)
    setShowResourcePicker(false)
  }, [])
  const toggleResourcePicker = useCallback(
    () => setShowResourcePicker(!showResourcePicker),
    [showResourcePicker]
  )

  const handleCardClose = useCallback((id) => {
    let newCollections = []
    newCollections = selectedCollections.filter((collection) => collection.id != id )
    setSelectedCollections(newCollections)
  })

  return (
    <Fragment>
      <div className="layout--wrapper">
        <div className="block--wrapper">
          <DisplayText size="small">Select your collections</DisplayText>
        </div>
        <div className="divider"></div>
        <div className="block--wrapper">
          <Card sectioned title="Add Collections">
            <div
              className="search-products--wrapper"
              onClick={toggleResourcePicker}
            >
              <div className="search-icon--wrapper">
                <Icon source={SearchMinor} color="subdued" />
                <TextStyle variation="subdued">Search Collections</TextStyle>
              </div>
              <div>
                <Icon source={FilterMajor} color="subdued" />
              </div>
            </div>
            {showResourcePicker && (
              <ResourcePicker
                resourceType="Collection"
                showVariants={false}
                selectMultiple={true}
                onCancel={toggleResourcePicker}
                onSelection={handleCollectionChange}
                open
              />
            )}
          </Card>
          <div className="block--wrapper">
            <Grid>
              {selectedCollections.map((collection) => (
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                  <MediaCard
                    key={collection.id}
                    portrait
                    title={collection.title}
                    description={'Products: ' + collection.productsCount}
                  >
                    { collection.image ? (
                      <img
                        alt=""
                        width="100%"
                        height={200}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center"
                        }}
                        src={collection.image.originalSrc}
                      />
                    ) : (
                      <Icon
                        source={ImageMajor}
                        color="base"
                        size="small"
                      ></Icon>
                    )}
                    <div className="card-close"
                      onClick={()=>{
                        handleCardClose(collection.id)
                      }}
                    >
                    </div>
                  </MediaCard>
                </Grid.Cell>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
