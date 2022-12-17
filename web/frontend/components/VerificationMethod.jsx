import { useState, useCallback, Fragment } from "react"

import {
  Card,
  Layout,
  TextContainer,
  Heading,
  Grid,
  Image,
  TextField,
  DisplayText,
  DropZone,
  TextStyle,
  PageActions,
  Button,
  Thumbnail,
  Stack,
  Caption
} from "@shopify/polaris"

import {
  csvUploadInActiveImage,
  customerActiveImage,
  shopifyInActiveImage,
  logoUploadBackgroundImage,
  messageBackgroundImage,
  subDomainBackgroundImage,
  marketingBackgroundImage,
  selectedImage,
  customerInActiveImage,
  csvUploadActiveImage,
  shopifyActiveImage,
  themeLogo
} from "../assets"

export default function VerificationMethod() {
  const [txtCiqApiKey, setTxtCiqApiKey] = useState("")
  const [txtCiqListId, setTxtCiqListId] = useState("")
  const [txtCsTag, setTxtCsTag] = useState("")
  const [files, setFiles] = useState([])
  const [txtMarketing, setTxtMarketing] = useState("")
  const [txtSubdomain, setTxtSubdomain] = useState("")
  const [txtSupportEmail, setTxtSupportEmail] = useState("")
  const [verificationMethod, setVerificationMethod] = useState(1)
  const [logo, setLogo] = useState(themeLogo)

  const handleTxtMarketingChange = useCallback(
    (newValue) => setTxtMarketing(newValue), 
    []
  )

  const handleTxtSubdomainChange = useCallback(
    (newValue) => setTxtSubdomain(newValue), 
    []
  )

  const handleTxtSupportEmailChange = useCallback(
    (newValue) => setTxtSupportEmail(newValue), 
    []
  )

  const handleCiqApiKeyChange = useCallback(
    (value) => setTxtCiqApiKey(value),
    []
  )

  const handleTxtCiqListIdChange = useCallback(
    (value) => setTxtCiqListId(value),
    []
  )

  const handleTxtCsTagChange = useCallback(
    (value) => setTxtCsTag(value),
    []
  )

  const handleDropZoneDrop = useCallback(
    (dropFiles, _acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...dropFiles]),
    []
  )

  const handleLogoDropZoneDrop = useCallback(
    (dropFiles, _acceptedFiles, _rejectedFiles) =>
      {
        //console.log(dropFiles);
        //setFiles(dropFiles)
        //console.log(files)
        if(dropFiles.length > 0){
          setLogo(validImageTypes.includes(dropFiles[0].type)? window.URL.createObjectURL(dropFiles[0]) : NoteMinor)
        }
      },
    []
  )
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"]

  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  )

  const uploadMessage = !uploadedFiles && <DropZone.FileUpload />
  return (
    <Fragment>
      <div className="layout--wrapper">
        <div className="block--wrapper">
          <DisplayText size="small">Configure your site</DisplayText>
        </div>
        <div className="divider"></div>
        <div className="block--wrapper">
          <Heading>Verification Method</Heading>
          <TextContainer>
            <p>How would you like to verify access to your gifting sites?</p>
          </TextContainer>

          <div className="block--wrapper">
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                <div
                  className="verification-method--wrapper"
                  onClick={() => setVerificationMethod(1)}
                >
                  <Card sectioned>
                    {verificationMethod === 1 && (
                      <div className="card-background--wrapper">
                        <Image source={selectedImage} height={24} />
                      </div>
                    )}
                    <div style={{ textAlign: "center", paddingTop: 12 }}>
                      <Image
                        className={
                          verificationMethod === 1 ? "" : "visually-hidden"
                        }
                        source={customerActiveImage}
                        alt="Nice work on building a Shopify app"
                        height={60}
                      />
                      <Image
                        className={
                          verificationMethod !== 1 ? "" : "visually-hidden"
                        }
                        source={customerInActiveImage}
                        alt="Nice work on building a Shopify app"
                        height={60}
                      />
                      <div style={{ paddingTop: 12 }}>
                        <Heading>Creator IQ Integration</Heading>
                      </div>
                    </div>
                  </Card>
                </div>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                <div
                  className="verification-method--wrapper"
                  onClick={() => setVerificationMethod(2)}
                >
                  <Card sectioned>
                    {verificationMethod === 2 && (
                      <div className="card-background--wrapper">
                        <Image source={selectedImage} height={24} />
                      </div>
                    )}
                    <div style={{ textAlign: "center", paddingTop: 12 }}>
                      <Image
                        className={
                          verificationMethod === 2 ? "" : "visually-hidden"
                        }
                        source={csvUploadActiveImage}
                        alt="Nice work on building a Shopify app"
                        height={60}
                      />
                      <Image
                        className={
                          verificationMethod !== 2 ? "" : "visually-hidden"
                        }
                        source={csvUploadInActiveImage}
                        alt="Nice work on building a Shopify app"
                        height={60}
                      />
                      <div style={{ paddingTop: 12 }}>
                        <Heading>
                          CSV Upload
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Heading>
                      </div>
                    </div>
                  </Card>
                </div>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                <div
                  className="verification-method--wrapper"
                  onClick={() => setVerificationMethod(3)}
                >
                  <Card sectioned>
                    {verificationMethod === 3 && (
                      <div className="card-background--wrapper">
                        <Image source={selectedImage} height={24} />
                      </div>
                    )}
                    <div style={{ textAlign: "center", paddingTop: 12 }}>
                      <Image
                        className={
                          verificationMethod === 3 ? "" : "visually-hidden"
                        }
                        source={shopifyActiveImage}
                        alt="Nice work on building a Shopify app"
                        height={60}
                      />
                      <Image
                        className={
                          verificationMethod !== 3 ? "" : "visually-hidden"
                        }
                        source={shopifyInActiveImage}
                        alt="Nice work on building a Shopify app"
                        height={60}
                      />
                      <div style={{ paddingTop: 12 }}>
                        <Heading>Shopify Customer Tags</Heading>
                      </div>
                    </div>
                  </Card>
                </div>
              </Grid.Cell>
            </Grid>
          </div>
          
          {verificationMethod === 1 && (
            <Fragment>
              <div className="text-field--wrapper">
                <TextStyle variation="subdued">CIQ API Key</TextStyle>
                <TextField
                  value={txtCiqApiKey}
                  onChange={handleCiqApiKeyChange}
                  placeholder="Please enter the CIQ API Key"
                  autoComplete="off"
                />    
              </div>
              <div className="text-field--wrapper">
                <TextStyle variation="subdued">CIQ List ID</TextStyle>
                <TextField
                  value={txtCiqListId}
                  onChange={handleTxtCiqListIdChange}
                  placeholder="Please enter the CIQ list ID"
                  autoComplete="off"
                />
              </div>
            </Fragment>
          )}
          {verificationMethod === 2 && (
            <div className="text-field--wrapper">
              <Fragment>
                <TextStyle variation="subdued">
                  Please upload your list of users that you would like to have
                  access to gifted products
                </TextStyle>
                <DropZone onDrop={handleDropZoneDrop}>
                  {uploadedFiles}
                  {uploadMessage}
                </DropZone>
              </Fragment>
            </div>
          )}
          {verificationMethod === 3 && (
            <div className="text-field--wrapper">
              <Fragment>
                <TextStyle variation="subdued">
                  Please enter the Shopify customer tag you would like to use to
                  give access to your gifting site
                </TextStyle>
                <TextField
                  value={txtCsTag}
                  onChange={handleTxtCsTagChange}
                  placeholder="#"
                  autoComplete="off"
                />
              </Fragment>
            </div>
          )}
          
        </div>
        <div className="divider"></div>
        <div className="block--wrapper">
          <Card sectioned title="Logo Upload">
            <div className="card-background--wrapper">
              <Image
                source={logoUploadBackgroundImage}
                alt="Nice work on building a Shopify app"
              />
            </div>
            <Image
              className="upload-icon"
              source={logo}
              alt="Nice work on building a Shopify app"
              height={60}
            />
            <TextStyle variation="subdued">
              If you’d like to use a logo different than the one displayed above, please upload it here
            </TextStyle>
            <DropZone onDrop={handleLogoDropZoneDrop}>
              <DropZone.FileUpload actionTitle={"Add file"} />
            </DropZone>
          </Card>
        </div>
        <div className="block--wrapper">
          <Card sectioned title="Marketing Text">
            <div className="card-background--wrapper">
              <Image
                source={marketingBackgroundImage}
                alt="Nice work on building a Shopify app"
              />
            </div>
            <TextStyle variation="subdued">
              Please enter the page description that you would like presented to
              visitors on your gifting site
            </TextStyle>
            <TextField
              value={txtMarketing}
              onChange={handleTxtMarketingChange}
              multiline={3}
              autoComplete="off"
            />
          </Card>
        </div>
        <div className="block--wrapper">
          <Card sectioned title="Subdomain Entry">
            <div className="card-background--wrapper">
              <Image
                source={subDomainBackgroundImage}
                alt="Nice work on building a Shopify app"
              />
            </div>
            <TextStyle variation="subdued">
              Please enter the desired URL for your gifting site
            </TextStyle>
            <TextField
              value={txtSubdomain}
              onChange={handleTxtSubdomainChange}
              autoComplete="off"
            />
          </Card>
        </div>
        <div className="block--wrapper">
          <Card sectioned title="Support Email for Influencers">
            <div className="card-background--wrapper">
              <Image
                source={messageBackgroundImage}
                alt="Nice work on building a Shopify app"
              />
            </div>
            <TextStyle variation="subdued">
              Please enter the email address you would like your site visitors
              to reach out to with any issues
            </TextStyle>
            <TextField
              value={txtSupportEmail}
              onChange={handleTxtSupportEmailChange}
              autoComplete="off"
            />
          </Card>
        </div>
      </div>
    </Fragment>
  )
}
