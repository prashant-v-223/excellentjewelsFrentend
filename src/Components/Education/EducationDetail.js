import { getWebConfigurationTypeDetail } from 'Components/Redux/reducers/common.slice';
import { setGetDynamicDataLoader } from 'Components/Redux/reducers/common.slice';
import { setEducationList } from 'Components/Redux/reducers/common.slice';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GoBackToEducation from './GoBackToEducation';
import { Container } from 'react-bootstrap';
import DOMPurify from 'dompurify';

const EducationDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { getDynamicDataLoader, educationList, webConfigurationType } =
    useSelector(({ common }) => common);

  const getWebConfigurationTypeData = useCallback(
    async webConfigurationData => {
      const educationConfigId = webConfigurationData.find(
        item =>
          item?.Type_Code?.trim()?.toLowerCase() &&
          item?.Type_Code?.trim()?.toLowerCase() === 'education',
      )?.Type_ID;

      if (educationConfigId) {
        const { payload: educationPost } = await dispatch(
          getWebConfigurationTypeDetail(educationConfigId),
        );

        if (educationPost?.data?.length > 0) {
          dispatch(setEducationList(educationPost.data));
        }
      }
      dispatch(setGetDynamicDataLoader(false));
    },
    [dispatch],
  );

  useEffect(() => {
    if (
      getDynamicDataLoader &&
      educationList?.length === 0 &&
      webConfigurationType?.length > 0
    ) {
      getWebConfigurationTypeData(webConfigurationType);
    }
  }, [
    dispatch,
    educationList,
    webConfigurationType,
    getWebConfigurationTypeData,
    getDynamicDataLoader,
  ]);

  const parseAndFixHtml = htmlString => {
    // First unescape the escaped quotes and remove newlines
    if (!htmlString) return;

    let processedHtml = htmlString.replace(/\\n/g, '').replace(/\\"/g, '"');

    // Remove the outer formatting (initial ul/li with styling)
    processedHtml = processedHtml.replace(
      /<ul style=".*?"><li style=".*?"><font.*?><span.*?>(.*?)<\/span><\/font><\/li><\/ul>/g,
      '$1',
    );

    // Convert HTML entities back to HTML tags
    const textArea = document.createElement('textarea');
    textArea.innerHTML = processedHtml;
    processedHtml = textArea.value;

    // Handle nested list items properly - this fixes the indentation structure
    processedHtml = processedHtml.replace(
      /<li>(.*?)<li>/g,
      '<li>$1</li>\n<li>',
    );

    return processedHtml;
  };

  return (
    <main>
      <section className="education_diamond_wrap pt40-lg pt50 pb80 pb30-md pb80-lg">
        <Container>
          <GoBackToEducation />
          {educationList.map(item =>
            item._WebConfigurationDetailsList.map(data => {
              const sanitizedHtmlContent = DOMPurify.sanitize(
                parseAndFixHtml(data.Description),
              );

              return (
                Number(id) === data.Configuration_ID && (
                  <div className="diamond_detial_box">
                    {data.Detail_Heading && (
                      <h4 className="text_colorC ff_Mulish">
                        {data.Detail_Heading}
                      </h4>
                    )}

                    {data?.Description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sanitizedHtmlContent,
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                )
              );
            }),
          )}
        </Container>
      </section>
    </main>
  );
};

export default EducationDetail;
