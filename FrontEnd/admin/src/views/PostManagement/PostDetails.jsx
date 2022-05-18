import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonIcon from "../../components/ButtonIcon";
import ApartmentSvg from "../../components/Icons/ApartmentSvg";
import AlarmOnSvg from "../../components/Icons/AlarmOnSvg";
import Image from "../../components/Image";
import ModeSvg from "components/Icons/ModeSvg";
import DeleteSvg from "components/Icons/DeleteSvg";
import EventNoteSvg from "components/Icons/EventNoteSvg";
import AccountCircleSvg from "components/Icons/AccountCircleSvg";

function PostDetails() {
  const request = useRequest();
  const navigate = useNavigate();

  const { _id } = useParams();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({
    title: "",
    writer: "",
    edit_by: "",
    create_at: "",
    update_at: "",
    contents: [],
  });

  const getPost = async () => {
    setIsLoading(true);
    const { data } = await request.get(`information/read/${_id}`);
    setPost(data);
    setIsLoading(false);
  };

  useEffect(() => getPost(), []);

  useEffect(() => {
    console.log(state);
    if (state && state.isSubmitted) {
      // TODO: TTL delete
      // if (state.action == DELETE_POST) {
      //   navigate("/UsersManagement/", {
      //     replace: true,
      //   });
      //   return;
      // }

      getPost();
    }
  }, [state]);

  const { title = "", writer = "", edit_by = "", create_at = "", update_at = "", contents = [] } = post;

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Thông tin bài đăng
      </Typography>

      <Paper elevation={2} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="row">
          <Stack flexGrow={1}>
            <Stack>
              <Typography variant="h4" color="gray.700">
                {isLoading ? skeleton : title}
              </Typography>
              <Box width={100} height={2} bgcolor="gray.500" mt={2} />

              <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                <AccountCircleSvg size={16} mr={1} />
                <Typography variant="strong">{isLoading ? skeleton : `Tác giả: ${writer}`}</Typography>
              </Stack>

              <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                <EventNoteSvg size={16} mr={1} />
                <Typography variant="strong">{isLoading ? skeleton : `Ngày viết: ${create_at}`}</Typography>
              </Stack>

              {edit_by && (
                <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                  <AlarmOnSvg size={16} mr={1} />
                  <Typography variant="strong">
                    {isLoading ? skeleton : `Cập nhật lần cuối bởi: ${edit_by} vào lúc ${update_at}`}
                  </Typography>
                </Stack>
              )}
            </Stack>

            <Stack direction="row" mt={3} alignItems="center">
              <Typography variant="h4" color="gray.700" mr={2}>
                {isLoading ? skeleton : "Nội dung"}
              </Typography>
              <Box bgcolor="gray.300" height={2} flexGrow={1} />
            </Stack>

            {contents.map((content) => {
              if (content.type == "header")
                return (
                  <Typography key={content.value} variant="h5" color="gray.700" mt={2}>
                    {content.value}
                  </Typography>
                );

              if (content.type == "text")
                return (
                  <Typography key={content.value} variant="regular" color="gray.500" mt={2}>
                    {content.value}
                  </Typography>
                );

              if (content.type == "image")
                return (
                  <Stack key={content.caption} mt={2} alignItems="center">
                    <Image src={content.url} width={560} />
                    <Typography variant="regular" color="gray.500" mt={1} textAlign="center">
                      {content.caption}
                    </Typography>
                  </Stack>
                );
            })}
          </Stack>

          <Stack direction="row">
            <Stack width={132}>
              <ButtonIcon
                variant="contained"
                LeftIcon={ModeSvg}
                onClick={() => {
                  navigate("Edit", {
                    state: post,
                  });
                }}
                sx={{ marginBottom: 2 }}
              >
                Chỉnh sửa
              </ButtonIcon>
              <ButtonIcon
                variant="contained"
                color="red"
                LeftIcon={DeleteSvg}
                onClick={() => {
                  navigate("Delete", {
                    state: post,
                  });
                }}
              >
                Xoá
              </ButtonIcon>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default PostDetails;
